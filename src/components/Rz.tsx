import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import React from 'react';

const Rz = () => {


    return (
        <PanelGroup autoSaveId="example" direction="horizontal">
            <Panel >
                <div>Source exploer</div>
            </Panel>
            <PanelResizeHandle className="w-1 bg-gray-100"/>
            <Panel >
                <PanelGroup direction="vertical">
                    <Panel>
                        <div> SourceViewer </div>
                    </Panel>
                    <PanelResizeHandle className="h-1 bg-gray-100" />
                    <Panel >
                        <div>Console </div>
                    </Panel>
                </PanelGroup>
            </Panel>

        </PanelGroup>
    );
};

export default Rz;
