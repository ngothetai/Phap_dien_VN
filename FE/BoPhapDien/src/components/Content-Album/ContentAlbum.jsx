import React, { useEffect, useState } from 'react';
import '../../assets/sass/components/_contentAlbum.scss';
import Loading from '../Loading/Loading';
import { topicData } from '../../data/topic';
import TreeNode from './TreeNode';

const ContentAlbum = () => {
    const [topic, setTopic] = useState([]);

    useEffect(() => {
        setTopic(topicData);
    }, []);

    const renderTree = () => {
        if (topic.length === 0) return <Loading />;
        return (
            <div className="tree">
                <ul>
                    {topic.map((item) => (
                        <TreeNode key={item.id} item={item} />
                    ))}
                </ul>
            </div>
        );
    };

    const handleSend = (e) => {
        e.preventDefault()
    }

    return (
        <div className="content-album">
            <div className="title">
                <h1>BỘ PHÁP ĐIỂN ĐIỆN TỬ</h1>
            </div>
            <div className="search">
                <div>
                    <select name="topic" id="">
                        <option value="---- Xem theo chủ đề ----">---- Xem theo chủ đề ----</option>
                        {
                            topic && topic.length > 0 &&
                            (
                                topic.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))
                            )
                        }
                    </select>
                    <select name="topic" id="">
                        <option value="---- Xem theo đề mục ----">---- Xem theo đề mục ----</option>

                        {
                            topic && topic.length > 0 &&
                            (
                                topic.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))
                            )
                        }
                    </select>
                    <form onClick={handleSend} action="" className='inputSearch'>
                        <input type="text" name="" placeholder='Tìm kiếm' id="" />
                        <button type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        </button>
                    </form>
                </div>
                {renderTree()}
            </div>
        </div>
    );
};

export default ContentAlbum;
