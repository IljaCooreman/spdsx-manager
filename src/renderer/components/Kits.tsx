import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { State, WaveManagerEvents, KitNavigatorEvents } from '../store/types/types';
import { Kit } from '../../classes/Kit';

const Kits: React.FunctionComponent = () => {
    const { kitList } = useStoreon<State, KitNavigatorEvents>('kitList');
    return (
        <div>
            <ul>
                {kitList.map((kit: Kit) => (
                    <li key={kit.path}>{kit.path}</li>
                ))}
            </ul>
            <hr />
        </div>
    );
};

export default Kits;
