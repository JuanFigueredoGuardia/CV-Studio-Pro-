declare global {
  interface Window {
    html2pdf?: any;
  }
}

export interface PdfExportOptions {
  filename?: string;
  margin?: number | number[];
  quality?: number;
  scale?: number;
}

export async function exportCvToPdf(
  element: HTMLElement,
  options: PdfExportOptions = {}
): Promise<{ success: boolean; error?: string }> {
  const candidateName = options.filename || 'Curriculum_Vitae';
  const cleanFilename = `${candidateName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

  // If html2pdf is present on window (from CDN bundle loaded in index.html)
  if (window.html2pdf) {
    try {
      const opt = {
        margin: options.margin || [8, 8, 8, 8],
        filename: cleanFilename,
        image: { type: 'jpeg', quality: options.quality || 0.98 },
        html2canvas: {
          scale: options.scale || 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          scrollY: 0,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      await window.html2pdf().set(opt).from(element).save();
      return { success: true };
    } catch (err: any) {
      console.error('html2pdf generation error:', err);
      // Fallback to window.print()
      window.print();
      return { success: true, error: 'Fallback a impresión estándar activado' };
    }
  } else {
    // Graceful fallback to browser native print
    window.print();
    return { success: true, error: 'Impresión nativa A4 activada' };
  }
}

export function printCvNative(): void {
  window.print();
}
