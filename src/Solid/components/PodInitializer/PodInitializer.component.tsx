import { CaretDownOutlined, CaretUpOutlined, CloudSyncOutlined, FolderOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Alert, Button, Input, message, Modal, Spin } from 'antd';
import * as rdfLib from 'rdflib';
import React, { ChangeEvent, useState } from 'react';
import { useRDF, useSession } from '../..';
import { useLoader } from '../../lib/useLoader';
import { useProfile } from '../../lib/useProfile';
import { ns, sym } from '../../lib/useRDF/useRDF.helpers';
import { useToggle } from '../../lib/useToggle';
import { Term } from '../Term';
import { PodInitializerProps } from "./PodInitializer.d";
import './PodInitializer.scss';

const {space, solid} = ns;

export const PodInitializerComponent = (props:PodInitializerProps) => {
    const session = useSession();
    const profile = useProfile(session.webId);
    const rdf = useRDF();

    const hasStorage = profile.storage.length > 0;
    const hasTypes = profile.publicTypes.length > 0;

    const storageDef = <>This will set the <Term>storage</Term> property on your profile.</>;
    const typesDef = <>This will create a <Term>publicTypes</Term> file in your Pod, and add it to your profile.</>;

    const [storage, setStorage] = useState<string>((session.webId || "").replace("/profile/card#me", "/my-files/"));
    const updateStorage = (e:ChangeEvent<HTMLInputElement>) => {setStorage(e.currentTarget.value);}

    const [publicTypesFile, setPublicTypesFile] = useState<string>(`${storage}publicTypes.ttl`);
    const updatePublicTypesFile = (e:ChangeEvent<HTMLInputElement>) => {setPublicTypesFile(e.currentTarget.value);}

    const loader = useLoader();

    const setupStorage = () => {
        if(!hasStorage) {
            loader.start();
            const me = sym(session.webId) as rdfLib.NamedNode;
            const hasStorageAt = space("storage");
            const storageLoc = sym(storage) as rdfLib.NamedNode;
            const doc = sym(session.webId.replace("#me", "")) as rdfLib.NamedNode;

            rdf.update([],[
                rdfLib.st(me, hasStorageAt, storageLoc, doc),
            ], (fileUri, updateSuccess, updateErr, updateResponse) => {
                if(updateSuccess) {
                    message.success("File storage setup!");
                } else if(!!updateErr) {
                    message.error(updateErr);
                }
                loader.done();
            });
        }
    }

    const setupPublicTypesFile = () => {
        if(!hasTypes) {
            loader.start();
            const storageLoc = sym(publicTypesFile) as rdfLib.NamedNode;
            // TODO: Make this file public access
            rdf.create(storageLoc, "", "text/turtle")
                .then(() => {
                    const me = sym(session.webId) as rdfLib.NamedNode;
                    const hasPublicTypesFileAt = solid("publicTypeIndex");
                    const doc = sym(session.webId.replace("#me", "")) as rdfLib.NamedNode;

                    return rdf.update([],[
                        rdfLib.st(me, hasPublicTypesFileAt, storageLoc, doc),
                    ], (fileUri, updateSuccess, updateErr, updateResponse) => {
                        if(updateSuccess) {
                            message.success("List storage setup!");
                        } else if(!!updateErr) {
                            message.error(updateErr);
                        }
                    });
                })
                .finally(loader.done);
        }
    }

    const setupPod = () => {
        setupStorage();
        setupPublicTypesFile();
    }

    const showAdvanced = useToggle();

    return <Modal
        className="pod-setup-form"
        visible={session.isLoggedIn && (!hasStorage || !hasTypes)}
        title={<>
            <CloudSyncOutlined /> Your Pod needs to be setup!
            <Button type="link" onClick={showAdvanced.toggle}>
                {showAdvanced.isOn ? <CaretDownOutlined /> : <CaretUpOutlined />} Advanced Settings
            </Button>
        </>}
        footer={<div className="setup-btn-container">
            <Button type="primary" size='large' onClick={setupPod}>
                <CloudSyncOutlined /> Setup my Pod
            </Button>
        </div>}
        closable={false}
    >
        <Spin spinning={loader.isLoading}>
            <p><b>Before you can start using your Pod, we need to get some things setup...</b></p>
            

            {!hasStorage && <Alert
                message={<>
                    <b><FolderOutlined /> Files</b><br/>
                    You need someplace to store all your stuff.  We'll setup a default <Term definition={storageDef}>storage</Term> location in your Pod for you to upload all your files.<br/>
                    {showAdvanced.isOn && <Input value={storage} onChange={updateStorage} />}
                </>}
            />}

            {!hasTypes && <Alert
                message={<>
                    <b><OrderedListOutlined /> Lists</b><br/>
                    You need someplace to store your lists, so other apps know where to find things in your Pod.  We'll create a <Term definition={typesDef}>public</Term> file that other apps can use to find out where different <Term definition={typesDef}>types</Term> of things are in your Pod.<br/>
                    {showAdvanced.isOn && <Input value={publicTypesFile} onChange={updatePublicTypesFile} /> }
                </>}
            />}
        </Spin>
    </Modal>;
}
