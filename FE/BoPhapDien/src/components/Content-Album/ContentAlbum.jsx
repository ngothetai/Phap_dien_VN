import React, { useEffect, useState } from 'react';
import '../../assets/sass/components/_contentAlbum.scss';
import data from '../../data/text.json';
import Loading from '../Loading/Loading';

const ContentAlbum = () => {
    const [tree, setTree] = useState([]);
    const [stack, setStack] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                setTree(Object.values(data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, []);

    const renderTree = () => {
        if (!tree.length) {
            return <Loading />;
        }

        const renderedTree = [];
        stack.push(...tree);

        while (stack.length > 0) {
            const currentNode = stack.pop();

            if (currentNode.children && currentNode.children.length > 0) {
                stack.push(...currentNode.children.reverse());
            }

            renderedTree.push(
                <li key={currentNode.id}>
                    <details>
                        <summary>
                            <span className="plus">+</span>
                            {currentNode.name}
                        </summary>
                    </details>
                </li>
            );
        }

        return <ul>{renderedTree}</ul>;
    };

    return (
        <div className="content-album">
            <div className="title">
                <h1>BỘ PHÁP ĐIỂN ĐIỆN TỬ</h1>
            </div>
            <div className="tree">{renderTree()}</div>
        </div>
    );
};

export default ContentAlbum;
