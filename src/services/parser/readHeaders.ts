// @ts-ignore
import { ExcelRenderer } from "react-excel-renderer"

const readHeaders = async (file: any) => {

    const response = await ExcelRenderer(file, (error: Error) => {
        if (error) {
            return
        }
    });

    return response.rows[0]
};

export default readHeaders;
