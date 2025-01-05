import { remark } from "remark";
import remarkHtml from "remark-html";

export class MarkdownFormatter {
  static async process(markdown: string): Promise<string> {
    return this.MarkdownToHTML(markdown).then((result) =>
      this.applyFormatting(result),
    );
  }
  /**
   * Processes some markdown input
   */
  private static async MarkdownToHTML(markdown: string): Promise<string> {
    return remark()
      .use(remarkHtml)
      .process(markdown)
      .then((processed) => processed.toString());
  }

  /**
   * Applies custom formatting to a text block, generally originating from a markdown file
   */
  private static applyFormatting(processedMarkdown: string): string {
    return processedMarkdown
      .replaceAll(/-\/-/g, "<hr/>")
      .replaceAll(/❦/g, "<hr/>")
      .replaceAll(/\[([0-9]+)\]/g, (_, n) => `<sup>${n}</sup>`)
      .replaceAll(/\~\~([^\~]+)\~\~/g, (_, contents) => `<s>${contents}</s>`)
      .replace(
        /--postscript--(.*)/s,
        (_, ps) => `<div class="postscript">${ps}</div>`,
      )
      .replaceAll(
        /\[caption\]\(([^\)]+)\)/gs,
        (_, caption) => `<div class="caption">${caption}</div>`,
      );
  }
}
