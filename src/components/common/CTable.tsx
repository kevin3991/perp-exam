import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export interface ICTableColumn {
  field: string;
  header: string;
  body?: (rowData: any) => JSX.Element;
}
interface ICTableProps {
  data: any[];
  columns: ICTableColumn[];
}

const CTable = (props: ICTableProps): JSX.Element => {
  return (
    <DataTable value={props.data}>
      {props.columns.map((column) => (
        <Column
          key={column.field}
          field={column.field}
          header={column.header}
          body={column.body}
        ></Column>
      ))}
    </DataTable>
  );
};

export default CTable;
