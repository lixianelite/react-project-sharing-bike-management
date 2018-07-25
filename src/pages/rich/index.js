import React from 'react';
import {Card, Button, Modal} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html';

export default class RichText extends React.Component{

    state={
        showRichText: false,
        editorState: ''
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }

    onContentChange = (contentState) => {
        this.setState({
            contentState
        });
    }

    handleClearContent = () => {
        this.setState({
            editorState: ''
        });
    }

    handleGetText = () => {
        this.setState({
            showRichText: true
        });
    }


    render() {

        const {editorState} = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent} style={{marginRight:10}}>Clear</Button>
                    <Button type="primary" onClick={this.handleGetText}>Get HTML Content</Button>
                </Card>
                <Card title="Rich text editor">
                <Editor
                    editorState={editorState}
                    onContentStateChange={this.onContentChange}
                    onEditorStateChange={this.onEditorStateChange}
                />
                </Card>

                <Modal
                    title="rich text"
                    visible={this.state.showRichText}
                    onCancel={()=> {
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                    >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}