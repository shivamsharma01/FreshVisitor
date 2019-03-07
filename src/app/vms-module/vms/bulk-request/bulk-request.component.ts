import { Component, OnInit } from "@angular/core";
import { TemplateService } from "./template.service";
import { saveAs as importedSaveAs } from "file-saver";
import * as XLSX from "xlsx";

@Component({
  selector: "app-bulk-request",
  templateUrl: "./bulk-request.component.html",
  styleUrls: ["./bulk-request.component.css"]
})
export class BulkRequestComponent implements OnInit {
  errorMsg: string;
  constructor(private templateService: TemplateService) {}

  ngOnInit() {}

  getFile() {
    this.templateService.getFile().subscribe(data => {
      const wb: XLSX.WorkBook = XLSX.read(data, { type: "buffer" });
      const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
      const dataAsObject = <VisitorData[]>(
        XLSX.utils.sheet_to_json(ws, { header: 0 })
      );
    });
  }

  downloadFile() {
    this.templateService.downloadFile().subscribe(blob => {
      importedSaveAs(blob, 'template');
    });
  }

  onFileChange(evt: any) {
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) {
      this.errorMsg = 'You are allowed to submit only 1 sheet!!! Try Again.'
      return;
    };
    this.clearErrorMsg();
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			const wb: XLSX.WorkBook = XLSX.read(e.target.result, {type: 'binary'});
			const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
      let dataAsObject = <VisitorData[]>(XLSX.utils.sheet_to_json(ws, {header: 0}));
      console.log(dataAsObject);
		};
		reader.readAsBinaryString(target.files[0]);
  }

  clearErrorMsg() {
    this.errorMsg = null;
  }
}

class VisitorData {
  constructor(
    public SNO: number,
    public NAME: string,
    public Email: string,
    public MOBILE: string,
    public UNIQUE_TYPE: string,
    public UNIQUE_ID: string
  ) {}
}
