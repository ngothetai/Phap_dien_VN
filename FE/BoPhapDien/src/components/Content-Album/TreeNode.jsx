import React, { useState } from 'react';
import axios from 'axios';
import CustomModal from './CustomModal';
import pdfUrl from '../../data/detail.pdf';
const TreeNode = ({ item }) => {
    const [heading, setHeading] = useState([]);
    const [chaps, setChaps] = useState([]);
    const [things, setThings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleToggle = async (url, params, setData) => {
        try {
            if (params.id_parent === null) {
                params.id_parent = "null";
            }
            const { data } = await axios.get(url, { params: params });
            setData(data);
        } catch (error) {
            console.log(url);
            console.log(params);
            // console.log(error);
        }
    }
    const renderNode = () => {
        return (
            <li key={item.topic_id}>
                <details onToggle={() => handleToggle("http://127.0.0.1:8000/api/heading/", { id_topic: item.topic_id }, setHeading)}>
                    <summary>
                        <span className="plus">+</span>
                        Chủ đề: {item.topic_name}
                    </summary>
                    {
                        heading && heading.length > 0 &&
                        <ul>
                            {heading.map((node, index) => (
                                <li key={node.heading_id}>
                                    <details onToggle={() => handleToggle("http://127.0.0.1:8000/api/article/", {
                                        id_heading: node.heading_id,
                                        id_parent: null
                                    }, setChaps)}>
                                        <summary>
                                            <span className="plus">+</span>
                                            Đề mục {index + 1}: {node.heading_name}
                                        </summary>
                                        {
                                            chaps && chaps.length > 0 &&
                                            <ul>
                                                {chaps.map((childNode) => (
                                                    <li key={childNode.article_id}>
                                                        <details onToggle={() => handleToggle("http://127.0.0.1:8000/api/article/", {
                                                            id_heading: childNode.heading,
                                                            id_parent: childNode.article_id
                                                        }, setThings)}>
                                                            <summary>
                                                                <span className="plus">+</span>
                                                                {childNode.article_name}
                                                            </summary>
                                                            {
                                                                things && things.length > 0 &&
                                                                <ul>
                                                                    {
                                                                        things.map((subChildNode, index) => (
                                                                            <li key={index} className='leaf'>
                                                                                <span className="plus">-</span>
                                                                                {subChildNode.article_name}
                                                                                <button className='btn-detail' onClick={openModal}>(Xem chi tiết)</button>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>

                                                            }
                                                        </details>
                                                    </li>
                                                ))}
                                            </ul>

                                        }
                                    </details>
                                </li>
                            ))}
                        </ul>
                    }
                </details>
                <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                    <object data={pdfUrl} type="application/pdf" width="100%" height="600px">
                        <p style={{ marginBottom: "28px", lineHeight: "36px" }}>Trình duyệt của bạn không hỗ trợ xem trực tiếp tệp PDF. Bạn có thể <a style={{ color: "red", ':hover': { color: '#0c8a43' } }} download="phapdien.pdf" href={pdfUrl}>tải xuống tại đây</a>.</p>
                    </object>
                </CustomModal>
            </li>
        )
    };

    return renderNode();
};

export default TreeNode;
