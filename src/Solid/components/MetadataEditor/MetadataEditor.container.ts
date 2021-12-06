import { inject, mergeProps } from "unstateless";
import {MetadataEditorComponent} from "./MetadataEditor.component";
import {IMetadataEditorInputProps, MetadataEditorProps} from "./MetadataEditor.d";

const connect = inject<IMetadataEditorInputProps, MetadataEditorProps>(mergeProps((a:any) => a));

export const MetadataEditor = connect(MetadataEditorComponent);
