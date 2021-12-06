import * as React from 'react';
import { flatten } from 'ts-functional';
import { EditorRegistrator, IRegisteredEditor } from './useRegisteredEditors.d';

const editorRegistrators:EditorRegistrator[] = [];

export const addEditorRegistrator = (reg:EditorRegistrator) => {
    editorRegistrators.push(reg);
}

const getRegisteredEditors = (types:string[]) => flatten(editorRegistrators.map((f) => f(types)));

export const useRegisteredEditors = (types:string[]) => {
    const [editors, setEditors] = React.useState<IRegisteredEditor[]>([]);

    React.useEffect(() => {
        setEditors(getRegisteredEditors(types));
    }, [types]);

    return editors;
}
