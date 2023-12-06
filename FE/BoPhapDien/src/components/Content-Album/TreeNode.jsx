import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CustomModal from './CustomModal';
import PDFReader from '../../components/Content-Album/PDFReader';

const TreeNode = ({ item, selectedHeading }) => {
    const [heading, setHeading] = useState([]);
    const [oneHeading, setOneHeading] = useState([]);
    const [chaps, setChaps] = useState([]);
    const [things, setThings] = useState([]);
    const [getID, setGetID] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const [headingData, chapsData] = await Promise.all([
                axios.get("http://103.140.39.166:80/api/heading/", { params: { id_topic: item.topic_id } }),
                axios.get("http://103.140.39.166:80/api/article/", { params: { id_heading: item.heading, id_parent: null } }),
            ]);

            setHeading(headingData.data);

            if ('heading_id' in headingData.data[0]) {
                const result = headingData.data.find(h => h.heading_id === item.heading);
                if (result !== undefined) {
                    setOneHeading([result]);
                }
            }

            setChaps(chapsData.data);
            setThings([]);
        } catch (error) {
            console.error(error);
        }
    }, [item.heading, item.topic_id]);

    useEffect(() => {
        if (selectedHeading) {
            fetchData();
        }
    }, [selectedHeading, fetchData]);

    const openModal = (heading_id) => {
        setIsModalOpen(true);
        setGetID(heading_id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleToggle = async (url, params, setData, setOtherData) => {
        try {
            if (params.id_parent === null) {
                params.id_parent = "null";
            }

            const { data } = await axios.get(url, { params: params });
            setData(data);

            if ('heading_id' in data[0]) {
                const result = data.find(h => h.heading_id === item.heading);
                if (result !== undefined) {
                    setOneHeading([result]);
                    setOtherData([]);
                }
            }

            if (item.isAllHeading) setOneHeading([]);
        } catch (error) {
            console.log(error);
        }
    };

    const renderNode = () => (
        <li key={item.topic_id}>
            <details onToggle={() => handleToggle("http://103.140.39.166:80/api/heading/", { id_topic: item.topic_id }, setHeading, setChaps)}>
                <summary>
                    <span className="plus">+</span>
                    Chủ đề: {item.topic_name}
                </summary>
                {oneHeading.length === 0 && heading && heading.length > 0 ? (
                    <ul>
                        {heading.map((node, index) => (
                            <li key={node.heading_id}>
                                <details onToggle={() => handleToggle("http://103.140.39.166:80/api/article/", { id_heading: node.heading_id, id_parent: null }, setChaps, setThings)}>
                                    <summary>
                                        <span className="plus">+</span>
                                        Đề mục {index + 1}: {node.heading_name}
                                        <button className='btn-detail' onClick={() => openModal(node.heading_id)}>(Xem chi tiết)</button>
                                    </summary>
                                    {chaps && chaps.length > 0 && (
                                        <ul>
                                            {chaps.map((childNode) => (
                                                <li key={childNode.article_id}>
                                                    <details onToggle={() => handleToggle("http://103.140.39.166:80/api/article/", { id_heading: childNode.heading, id_parent: childNode.article_id }, setThings, setThings)}>
                                                        <summary>
                                                            <span className="plus">+</span>
                                                            {childNode.article_name}
                                                            <button className='btn-detail' onClick={() => openModal(node.heading_id)}>(Xem chi tiết)</button>
                                                        </summary>
                                                        {things && things.length > 0 && (
                                                            <ul>
                                                                {things.map((subChildNode, index) => (
                                                                    <li key={index} className='leaf'>
                                                                        <span className="plus">-</span>
                                                                        {subChildNode.article_name}
                                                                        <button className='btn-detail' onClick={() => openModal(node.heading_id)}>(Xem chi tiết)</button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </details>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </details>
                            </li>
                        ))}
                    </ul>
                ) : (
                    oneHeading.length > 0 && (
                        <ul>
                            {oneHeading.map((node, index) => (
                                <li key={node.heading_id}>
                                    <details onToggle={() => handleToggle("http://103.140.39.166:80/api/article/", { id_heading: node.heading_id, id_parent: null }, setChaps, setThings)}>
                                        <summary>
                                            <span className="plus">+</span>
                                            Đề mục {index + 1}: {node.heading_name}
                                        </summary>
                                        {chaps && chaps.length > 0 && (
                                            <ul>
                                                {chaps.map((childNode) => (
                                                    <li key={childNode.article_id}>
                                                        <details onToggle={() => handleToggle("http://103.140.39.166:80/api/article/", { id_heading: childNode.heading, id_parent: childNode.article_id }, setThings, setThings)}>
                                                            <summary>
                                                                <span className="plus">+</span>
                                                                {childNode.article_name}
                                                            </summary>
                                                            {things && things.length > 0 && (
                                                                <ul>
                                                                    {things.map((subChildNode, index) => (
                                                                        <li key={index} className='leaf'>
                                                                            <span className="plus">-</span>
                                                                            {subChildNode.article_name}
                                                                            <button className='btn-detail' onClick={() => openModal(node.heading_id)}>(Xem chi tiết)</button>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </details>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </details>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </details>
            <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                <PDFReader heading_id={getID} />
            </CustomModal>
        </li>
    );

    return renderNode();
};

export default TreeNode;
