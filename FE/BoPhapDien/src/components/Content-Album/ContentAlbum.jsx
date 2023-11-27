// ContentAlbum.js
import React, { useEffect, useState } from 'react';
import '../../assets/sass/components/_contentAlbum.scss';
import axios from 'axios';
import Loading from '../Loading/Loading';

const TreeNode = React.memo(({ item, depth = 0 }) => {
    const isLeafNode = !item.children || item.children.length === 0;
    const isChapterNode = !isLeafNode;

    const renderNode = () => (
        <li key={item.id}>
            <details>
                <summary>
                    <span className="plus">{isLeafNode ? '-' : '+'}</span>
                    {item.name}
                </summary>
                {/* {isChapterNode ? renderChildren(item.children, depth + 1) : null} */}
                {isChapterNode && (
                    <ul>
                        {item.children.map(childNode => (
                            <TreeNode key={childNode.id} item={childNode} depth={depth + 1} />
                        ))}
                    </ul>
                )}
            </details>
        </li>
    );

    // const renderChildren = (nodes, currentDepth) => {
    //     if (!nodes || nodes.length === 0 || currentDepth > 3) {
    //         return null;
    //     }

    //     return (
    //         <ul>
    //             {nodes.map(childNode => (
    //                 <TreeNode key={childNode.id} item={childNode} depth={currentDepth} />
    //             ))}
    //         </ul>
    //     );
    // };

    return renderNode();
});

const ContentAlbum = () => {
    const [tree, setTree] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                // const sortedData = Object.values(data).sort((a, b) => a.id - b.id);
                const { data } = await axios.get("http://127.0.0.1:8000/get_tree", function (req, res) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.send('Hello World');
                },
                );
                // console.log(data);
                setTree(data);
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

        return (
            <div className="tree">
                <ul>
                    {tree.map(item => (
                        <TreeNode key={item.id} item={item} />
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="content-album">
            <div className="title">
                <h1>BỘ PHÁP ĐIỂN ĐIỆN TỬ</h1>
            </div>
            {renderTree()}
        </div>
    );
};

export default ContentAlbum;
