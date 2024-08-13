import DataTable from "./data-table";
import { fireEvent, render, screen } from "@testing-library/react";

describe("DataTable", () => {

    let data = [["Gaston", "Globant", "2023-12-20"], ["Pepe", "Globant", "2023-12-20"]];

    const deleteRow = (index: string[]) => {
        const rowIndex = data.findIndex((row) => JSON.stringify(row) === JSON.stringify(index));
        if (rowIndex !== -1) {
            data.splice(rowIndex, 1);
        }
    }

    beforeEach(() => {

        render(<DataTable headings={["Name", "Company", "Date"]} data={data} actionColor={"bg-red-600"} actionTitle="Delete" actionFunction={deleteRow} />);
    })
    test("Should render", () => {
        expect(screen.getByText("Name")).toBeDefined();
    })

    test("should delete the first row", () => {
        console.log("Data before click delete:", data)
        const button = screen.getAllByText("Delete")[0];
        fireEvent.click(button);
        expect(data.find((val) => val.find((item: string) => item == "Gaston"))).toBeUndefined();
        console.log("Data after click delete:", data);
    })


});