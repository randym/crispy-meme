import { STRING, NUMBER } from "./const";

export const CSV = {
  parse(csv: string, options: { headers: boolean } = { headers: true }) {
    const rows = csv.split("\n");
    const headers: string[] = options.headers
      ? (rows.shift()?.split(",") as string[])
      : (Array(csv[0].length)
          .fill(null)
          .map((_, i) => `column_${i}`) as string[]);

    const types: string[] = new Array(headers.length).fill(STRING);

    const source = rows.reduce(
      (acc, row) => {
        let data = row.split(",");
        if (data.length !== headers.length) {
          console.warn("CSV data is not consistent with headers");
          return acc;
        }

        const parsedRow = data.map((value, index) => {
          const tmp = Number(value);
          if (!isNaN(tmp)) {
            types[index] = NUMBER;
            return tmp;
          }
          return value;
        }) as (string | number)[];

        acc.push(parsedRow);
        return acc;
      },
      [] as (string | number)[][],
    );

    return { headers, source, types };
  },
};
