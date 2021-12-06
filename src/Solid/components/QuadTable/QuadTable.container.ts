import { inject, mergeProps } from "unstateless";
import {QuadTableComponent} from "./QuadTable.component";
import {IQuadTableInputProps, QuadTableProps} from "./QuadTable.d";

const connect = inject<IQuadTableInputProps, QuadTableProps>(mergeProps((a:any) => a));

export const QuadTable = connect(QuadTableComponent);
