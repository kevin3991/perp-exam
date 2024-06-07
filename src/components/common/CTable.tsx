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
  stripedRows?: boolean;
  scrollable?: boolean;
}

const CTable = (props: ICTableProps): JSX.Element => {
  const { stripedRows = false, scrollable = true } = props;

  return (
    <DataTable
      value={props.data}
      stripedRows={stripedRows}
      scrollable={scrollable}
    >
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
