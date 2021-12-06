import { CloseOutlined, FileOutlined, FolderOutlined } from '@ant-design/icons';
import { Breadcrumb, Checkbox, Col, Menu, Modal, Popconfirm, Row, Spin, Typography } from 'antd';
import { NamedNode } from 'rdflib';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sym, useRDF } from '../..';
import { useDirectory } from '../../lib/useDirectory/useDirectory';
import { useFileClient } from '../../lib/useFileClient';
import { Quad } from '../../lib/useRDF/useRDF.d';
import { useToggle } from '../../lib/useToggle';
import { DirectoryCreateForm } from '../DirectoryCreateForm';
import { File } from '../File';
import { MetadataEditor } from '../MetadataEditor';
import { Permissions } from '../Permissions';
import { UploadButton } from '../UploadButton';
import { DirectoryProps } from "./Directory.d";
import './Directory.scss';

export const DirectoryComponent = (props:DirectoryProps) => {
    const location = useLocation();
    const client = useFileClient();
    const rdf = useRDF();
    const {store} = rdf.graph;

    const dirPath = location.pathname.substring(1).split("/").slice(1).filter(a => !!a).join("/");

    const [directories, files, curDir, isLoading, refresh] = useDirectory(dirPath);

    const [curDirName, setCurDirName] = React.useState("");
    const deleteDirectory = (dirName:string) => () => {
        setCurDirName(dirName);
        client.deleteDirectory(dirName).then(() => {
            store.removeMatches(sym(dirName));
            store.removeMatches(null, null, sym(dirName));
            refresh();
        });
    }

    const [isFileEditorVisible, setIsFileEditorVisible] = React.useState(false);
    const [curFile, setCurFile] = React.useState("");
    const showFileEditor = (file:string) => {
        setCurFile(file);
        setIsFileEditorVisible(true);
    }
    const hideFileEditor = () => {setIsFileEditorVisible(false);}

    const showSystemFiles = useToggle(false);

    return <Spin spinning={isLoading}>
        <Modal visible={isFileEditorVisible} onCancel={hideFileEditor} footer={null} destroyOnClose width="50%">
            <MetadataEditor file={curFile} />
        </Modal>
        <Row><Col xs={24}>
            <h1><FolderOutlined /> My Stuff</h1>
        </Col></Row>
        <Row>
            <Col xs={24}>
                <Breadcrumb>
                    <Breadcrumb.Item key="/storage">
                        <Link to="/storage">My Stuff</Link>
                    </Breadcrumb.Item>
                    {dirPath.split("/").map((name:string, index:number, parts:string[]) =>
                        <Breadcrumb.Item key={name}>
                            <Link to={"/storage/" + parts.slice(0, index+1).join("/")}>{name}</Link>
                        </Breadcrumb.Item>
                    )}
                </Breadcrumb>
                <hr/>
            </Col>
            <Col xs={4}>
                <h4><FolderOutlined /> Folders</h4>
                <hr/>
                <DirectoryCreateForm parent={curDir} onCreate={refresh} />
                <Menu>
                    {directories.map((dir:NamedNode) =>
                        <Menu.Item className="dir-link" key={dir.value}>
                            <Spin spinning={client.isLoading && curDirName === dir.value}>
                                <Link to={`/storage/${dirPath}${dir.value.replace(curDir, "").replace("/", "")}`}>
                                    <FolderOutlined /> {dir.value.replace(curDir, "").replace("/", "").replace(/\%20/g, " ")}
                                </Link>
                                <Popconfirm
                                    title="Are you sure you want to delete this directory and everything in it?"
                                    okText="Delete"
                                    cancelText="Keep"
                                    onConfirm={deleteDirectory(dir.value)}
                                >
                                    <span className="directory-delete-btn"><Typography.Text type="danger"><CloseOutlined /></Typography.Text></span>
                                </Popconfirm>
                            </Spin>
                        </Menu.Item>
                    )}
                </Menu>
            </Col>
            <Col xs={16} className="file-list">
                <div style={{float: "right"}}>
                    <UploadButton directory={curDir} onSuccess={refresh}/>
                </div>
                <h4><FileOutlined /> Files</h4>
                <Checkbox checked={showSystemFiles.isOn} onChange={showSystemFiles.onChange}>
                    Show system files
                </Checkbox>
                <hr/>
                {files
                    .filter(file => showSystemFiles.isOn || !file.value.includes(".ttl"))
                    .map((file:Quad) =>
                        <File onDelete={refresh} key={file.value} node={file} onEdit={showFileEditor} />
                    )
                }
            </Col>
            <Col xs={4}>
                <Permissions uri={curDir} />
            </Col>
        </Row>
    </Spin>;
}
