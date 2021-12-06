import { inject, mergeProps } from "unstateless";
import {InlineEditComponent} from "./InlineEdit.component";
import {IInlineEditInputProps, InlineEditProps} from "./InlineEdit.d";

const connect = inject<IInlineEditInputProps, InlineEditProps>(mergeProps((a:any) => a));

export const InlineEdit = connect(InlineEditComponent);
