import { CloseOutlined, EditOutlined, MailOutlined, MessageOutlined, PhoneOutlined, PictureOutlined, PlusOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row, Select, Typography, Upload } from 'antd';
import * as React from 'react';
import { ns, sym, useSession } from '../../../Solid';
import { ValuePredicateGroupInput } from '../../../Solid/components/ValuePredicateGroupInput';
import { WIP } from '../../../Solid/components/WIP';
import { AgentSelect } from '../AgentSelect';
import { AboutMePageProps } from "./AboutMePage.d";
import './AboutMePage.scss';

const {Text} = Typography;
const {vcard, foaf} = ns;

const TypeSelector = ({value, values}:any) => <>
    <Select className="type-select" mode="tags" value={value} placeholder="What kind?">
        {values.map((val:string) =>
            <Select.Option key={val} value={val}>{val}</Select.Option>
        )}
    </Select>
</>;

const doNothing = () => {/*do nothing*/}
const ValueEditor = ({value, types, selectedTypes, groups}:any) => 
    <Input
        className="value-edit"
        addonBefore={<TypeSelector values={types} value={selectedTypes} />}
        addonAfter={<>
            <AgentSelect agents={groups} agentClasses={[]} onSelectAgent={doNothing} onSelectAgentClass={doNothing} inline />
            <span style={{display: "inline-block", borderLeft: "solid 1px", marginLeft: "4px"}}>&nbsp;</span>
            <Text type="danger"> <CloseOutlined /></Text>
        </>}
        value={value}
    />;

const ValueAdder = ({types, placeholder}:any) =>
    <Input addonBefore={<TypeSelector values={types} value={[]} />} addonAfter={<span className="add-btn"><PlusOutlined /></span>} value="" placeholder={placeholder} />;

const emailTypes = ["Personal", "Work", "Alt"];
const phoneTypes = ["Home", "Work", "Cell", "Alt"];

export const AboutMePageComponent = (props:AboutMePageProps) => {
    const session = useSession();
    
    return <Row>
        <Col xs={24}>
            <WIP />
        </Col>
        <Col xs={{offset: 6, span: 12}}>
            <h1><UserOutlined /> About Me</h1>
            
            <Card size="small" title={<><UserOutlined /> Names</>}>
                <ValuePredicateGroupInput subject={sym(session?.webId || "")} predicates={{
                    Family: foaf("familyName"),
                    First: foaf("firstName"),
                    Full: vcard("fn"),
                    Given: foaf("givenName"),
                    Last: foaf("lastName"),
                    Name: foaf("name"),
                    Nick: foaf("nick"),
                }} />
            </Card>

            <hr/>

            <Card size="small" title={<><PictureOutlined /> Pictures</>}>
                <Row>
                    <Col xs={6}>
                        <img src="https://picsum.photos/300/300" style={{width: "100%"}} alt=""/>
                        <AgentSelect agents={["Public"]} agentClasses={[]} onSelectAgent={doNothing} onSelectAgentClass={doNothing} />
                    </Col>
                    <Col xs={6}>
                        <img src="https://picsum.photos/300/300" style={{width: "100%"}} alt=""/>
                        <AgentSelect agents={["Gaming", "BDSM"]} agentClasses={[]} onSelectAgent={doNothing} onSelectAgentClass={doNothing} />
                    </Col>
                    <Col xs={6}>
                        <Upload.Dragger>
                            <div style={{height: "150px"}}>
                                <UploadOutlined />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                        </Upload.Dragger>
                    </Col>
                </Row>
            </Card>

            <Card size="small" title={<><MessageOutlined /> Email Addresses</>}>
                <ValueEditor value="andy@wittrock.us" types={emailTypes} selectedTypes={["Personal"]} groups={["Public"]}/>
                <ValueEditor value="awittrock@parts-unltd.com" types={emailTypes} selectedTypes={["Work"]} groups={["Professional", "Writing"]} />
                <ValueEditor value="witty1024@yahoo.com" types={emailTypes} selectedTypes={["Alt"]} groups={[]} />
                <ValueAdder types={emailTypes} placeholder="New email" />
            </Card>

            <Card size="small" title={<><PhoneOutlined /> Phone Numbers</>}>
                <ValueEditor value="(515) 371-2620" types={phoneTypes} selectedTypes={["Home", "Cell"]} groups={["Family", "Friends", "Professional"]} />
                <ValueEditor value="(608) 358-8852" types={phoneTypes} selectedTypes={["Alt"]} groups={["Family"]} />
                <ValueEditor value="(608) 123-4567" types={phoneTypes} selectedTypes={["Work"]} groups={["Professional"]} />
                <ValueAdder types={phoneTypes} placeholder="New number" />
            </Card>

            <Card size="small" title={<><MailOutlined /> Mailing Addresses</>}>
                <Row>
                    <Col xs={12} style={{paddingRight: "4px"}}>
                        <Card title="Home" size="small" extra={<><span className="edit-btn"><EditOutlined /></span> <Text type="danger"><CloseOutlined /></Text></>}>
                            678 Schaefer Rd<br/>
                            Belleville, WI 53508<br/>
                            USA<br/>
                            <AgentSelect agents={["Family", "Professional"]} agentClasses={[]} onSelectAgent={doNothing} onSelectAgentClass={doNothing} inline />
                        </Card>
                    </Col>
                    <Col xs={12} style={{paddingLeft: "4px"}}>
                        <Card title="Vacation" size="small" extra={<><span className="edit-btn"><EditOutlined /></span> <Text type="danger"><CloseOutlined /></Text></>}>
                            123 Awesome Lane<br/>
                            Beachside, FL 12345<br/>
                            USA<br/>
                            <AgentSelect agents={["Family"]} agentClasses={[]} onSelectAgent={doNothing} onSelectAgentClass={doNothing} inline />
                        </Card>
                    </Col>
                    <Col xs={12} style={{paddingLeft: "4px"}}>
                        <Card title="Private Retreat" size="small" extra={<><span className="edit-btn"><EditOutlined /></span> <Text type="danger"><CloseOutlined /></Text></>}>
                            123 Nowhere Lane<br/>
                            Someplace, CO 54321<br/>
                            USA<br/>
                            <AgentSelect agents={[]} agentClasses={[]} onSelectAgent={doNothing} onSelectAgentClass={doNothing} inline />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>;
}
