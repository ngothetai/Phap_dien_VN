import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { heading } from '../../data/heading';
import { article } from '../../data/article';
import { things } from '../../data/things';
import CustomModal from './CustomModal';
const TreeNode = ({ item }) => {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleToggle = async () => {
        if (!item.children || item.children.length === 0) {
            setLoading(true);

            try {
                let apiUrl = '';
                switch (item.level) {
                    case 'topic':
                        setChildren(heading);
                        break;
                    case 'heading':
                        setChildren(article);
                        break;
                    case 'article':
                        setChildren(things);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    const renderNode = () => (
        <li key={item.id}>
            <details onToggle={handleToggle}>
                <summary>
                    <span className="plus">{item.level == "things" ? "-" : "+"}</span>
                    {item.name}
                    {item.level === "things" && <button className='btn-detail' onClick={openModal}>(Xem chi tiết)</button>}
                </summary>
                {loading ? (
                    <Loading />
                ) : (
                    <ul>
                        {children.map((childNode) => (
                            <TreeNode key={childNode.id} item={childNode} />
                        ))}
                    </ul>
                )}
            </details>
            <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                {/* <object data="/path/to/your/pdf/file.pdf" type="application/pdf" width="100%" height="600px">
                    <p>Trình duyệt của bạn không hỗ trợ xem PDF. Bạn có thể tải xuống file <Link to="/path/to/your/pdf/file.pdf">tại đây</Link>.</p>
                </object> */}
                aksldfl
            </CustomModal>
        </li>
    );

    return renderNode();
};

export default TreeNode;
