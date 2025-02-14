import { jsPDF } from "jspdf";
import NotoSansKorean from "./NotoSansKoreanBase64";

export const addFontToPdf = (pdf) => {
	pdf.addFileToVFS("NotoSansKR-Black-normal.ttf", NotoSansKorean);
	pdf.addFont("NotoSansKR-Black-normal.ttf", "NotoSansKR-Black", "normal");
};
