import { getFile, overwriteFile, createContainerAt, deleteContainer, deleteFile } from '@inrupt/solid-client';
import { fetch } from "@inrupt/solid-client-authn-browser";
import { useLoader } from './useLoader';

export const useFileClient = () => {
    const loader = useLoader();

    return {
        createDirectory: (uri:string) => {
            loader.start();
            return createContainerAt(uri, {fetch}).finally(loader.done);
        },
        delete: (uri:string) => {
            loader.start();
            return deleteFile(uri, {fetch}).finally(loader.done);
        },
        deleteDirectory: (uri:string) => {
            loader.start();
            return deleteContainer(uri, {fetch}).finally(loader.done);
        },
        get: (uri:string) => {
            loader.start();
            return getFile(uri, {fetch}).finally(loader.done);
        },
        isLoading: loader.isLoading,
        put: (uri:string, data:File) => {
            loader.start();
            return overwriteFile(uri, data, {contentType: data.type, fetch}).finally(loader.done);
        },
    };
}