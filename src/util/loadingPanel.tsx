import * as React from "react";
import { observer } from "mobx-react";
import cn from "classnames";

export const LoadingPanel = observer(({ loading, children }) => (
    <div className={cn({ loading })}>
        <div className="loading-indicator">
            <i className='glyphicon-left glyphicon glyphicon-refresh spinning' />
            <div><small>Loading...</small></div>
        </div>
        {...children}
    </div>
));