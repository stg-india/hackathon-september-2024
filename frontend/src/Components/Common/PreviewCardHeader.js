import React from 'react';
import { CardHeader, Input, Label } from 'reactstrap';

const PreviewCardHeader = ({ title }) => {
    return (
        <React.Fragment>
            <CardHeader className="align-items-center d-flex">
                {/* <h4 className="flex-grow-1 display-6">{title}</h4> */}
                <h2 className="flex-grow-1">{title}</h2>
                <div className="flex-shrink-0">
                    <div className="form-check form-switch form-switch-right form-switch-md">
                        {/* <Label className="form-label text-muted">Show Code</Label> */}
                        <Input className="form-check-input code-switcher" type="checkbox" />
                    </div>
                </div>
            </CardHeader>
        </React.Fragment>
    );
}

export default PreviewCardHeader;