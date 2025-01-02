import { jsPDF } from "jspdf";
import CookieRunBold from "./CookieRunBoldBase64";

export const addFontToPdf = (pdf) => {
    pdf.addFileToVFS("CookieRunBold.ttf", CookieRunBold);
    pdf.addFont("CookieRunBold.ttf", "CookieRunBold", "normal");
};
