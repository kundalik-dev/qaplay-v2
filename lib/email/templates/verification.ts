/**
 * HTML email template — email address verification.
 * Returns a plain string (no JSX dependency, runs in any Node context).
 */
export function verificationEmailHtml({
  url,
  userName,
}: {
  url: string;
  userName?: string;
}): string {
  const greeting = userName ? `Hi ${escapeHtml(userName)},` : "Hi,";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email address</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="560" cellpadding="0" cellspacing="0" role="presentation"
               style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">

          <!-- Header -->
          <tr>
            <td style="background:#18181b;padding:28px 40px;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">
                QA Playground
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#18181b;letter-spacing:-0.3px;">
                Verify your email address
              </h1>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#52525b;">
                ${greeting}
              </p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#52525b;">
                Click the button below to verify your email address and activate your account.
                This link expires in <strong>24 hours</strong>.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="border-radius:8px;background:#18181b;">
                    <a href="${escapeHtml(url)}"
                       style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">
                      Verify email address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#71717a;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Fallback URL -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;">
                If the button doesn't work, paste this link into your browser:
              </p>
              <p style="margin:4px 0 0;font-size:12px;word-break:break-all;">
                <a href="${escapeHtml(url)}" style="color:#18181b;">${escapeHtml(url)}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f4f5;padding:20px 40px;border-top:1px solid #e4e4e7;">
              <p style="margin:0;font-size:12px;color:#71717a;">
                &copy; ${new Date().getFullYear()} QA Playground. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function verificationEmailText({ url }: { url: string }): string {
  return `Verify your QA Playground account\n\nClick the link below to verify your email:\n${url}\n\nThis link expires in 24 hours.\n\nIf you didn't create an account, ignore this email.`;
}

/** Minimal HTML escaping for values interpolated into HTML strings. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
