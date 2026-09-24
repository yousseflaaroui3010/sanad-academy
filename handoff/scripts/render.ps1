param([string]$in, [string]$out)
$ext = [IO.Path]::GetExtension($in).ToLower()
if ($ext -eq '.pptx') {
  $app = New-Object -ComObject PowerPoint.Application
  $p = $app.Presentations.Open($in, $true, $false, $false)
  $p.SaveAs($out, 32); $p.Close(); $app.Quit()
} else {
  $app = New-Object -ComObject Word.Application; $app.Visible = $false
  $d = $app.Documents.Open($in, $false, $true)
  $d.ExportAsFixedFormat($out, 17); $d.Close(0); $app.Quit()
}
