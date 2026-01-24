export const fetchSheetData = async (sheetId: string, sheetName: string) => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}`;

  const res = await fetch(url);
  const text = await res.text();

  // Google adds extra JS before JSON
  const json = JSON.parse(text.substring(47).slice(0, -2));

  const headers = json.table.cols.map((c: any) => c.label);

  return json.table.rows.map((row: any) =>
    Object.fromEntries(
      row.c.map((cell: any, i: number) => [headers[i], cell?.v ?? ""])
    )
  );
};
