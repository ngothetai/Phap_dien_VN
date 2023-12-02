import React, { useEffect, useState } from 'react';
import '../../assets/sass/components/_contentAlbum.scss';
import Loading from '../Loading/Loading';
import TreeNode from './TreeNode';
import axios from 'axios';
import CustomModal from './CustomModal';
import urlPdf from '../../data/detail.pdf';


const ContentAlbum = () => {
    const [topic, setTopic] = useState([]);
    const [searchTopic, setSearchTopic] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("");
    // const [allHeading, setAllHeading] = useState([]);


    useEffect(() => {
        const getTopic = async () => {
            try {
                const { data } = await axios.get("http://127.0.0.1:8000/api/topic/");
                setTopic(data);
            } catch (error) {
                console.log(error);
            }
        }
        getTopic();

        // const getALLHeading = async () => {
        //     if (topic.length > 0) {
        //         try {
        //             for (const item of topic) {
        //                 const { data } = await axios.get("http://127.0.0.1:8000/api/heading/", { params: { id_topic: item.topic_id } })
        //                 data && data.forEach(node => {
        //                     setAllHeading(prevAllHeading => [
        //                         ...prevAllHeading,
        //                         {
        //                             topic_id: node.topic,
        //                             heading_name: node.heading_name
        //                         }
        //                     ]);
        //                 })
        //             }
        //         } catch (e) {
        //             console.log(e);
        //         }
        //     }
        // }
        // getALLHeading();
    }, []);

    const handleSelectChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedValue(selectedOption);

        const result = topic.find((item => item.topic_name == selectedOption))
        if (result) {
            setSearchTopic([result]);
        } else setSearchTopic([]);

    };

    const renderTree = () => {
        if (topic.length === 0) return <Loading />;
        return (
            <div className="tree">
                <ul>
                    {searchTopic.length == 0 && topic.map((item, index) => (
                        <TreeNode key={index} item={item} />
                    ))}
                    {searchTopic.length > 0 && searchTopic.map((item, index) => (
                        <TreeNode key={index} item={item} />
                    ))}
                </ul>
            </div>
        );
    };


    const handleSend = async (e) => {
        e.preventDefault();
        try {
            if (search === "") return;
            const { data } = await axios.post("http://127.0.0.1:8000/api/search/", { "content": search });
            if (data.result) {
                setIsModalOpen(true);
                setSearch("");
                setSearchResult(data.result)
            }
        } catch (err) {
            console.log(err);
        }

    }


    return (
        <div className="content-album">
            <div className="title">
                <h1>BỘ PHÁP ĐIỂN ĐIỆN TỬ</h1>
                <a className='download' href={urlPdf} download="phapdien.pdf" >(Tải bộ pháp điển xuống <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>)</a>
            </div>
            <div className="search">
                <div>
                    <select name="topic" id="" value={selectedValue} onChange={handleSelectChange}>
                        <option value="---- Xem theo chủ đề ----">---- Xem theo chủ đề ----</option>
                        {
                            topic && topic.length > 0 &&
                            (
                                topic.map((item, index) => (
                                    <option key={index} value={item.topic_name}>{item.topic_name}</option>
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
                                    <option key={index} value={item.topic_name}>{item.topic_name}</option>
                                ))
                            )
                        }
                    </select>
                    <form onClick={handleSend} action="" className='inputSearch'>
                        <input type="text" name="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Tìm kiếm' id="" />
                        <button type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        </button>
                    </form>
                </div>
                {renderTree()}
                <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                    <h2 className='h2'> KẾT QUẢ TÌM KIẾM</h2>
                    <hr />
                    <p style={{ padding: "20px 0" }}>
                        {searchResult}
                    </p>
                    <hr style={{ marginBottom: "20px" }} />
                </CustomModal>
            </div>
        </div>
    );
};


export default ContentAlbum;