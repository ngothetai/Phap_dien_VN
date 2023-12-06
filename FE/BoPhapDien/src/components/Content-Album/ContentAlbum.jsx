import React, { useEffect, useState } from 'react';
import '../../assets/sass/components/_contentAlbum.scss';
import Loading from '../Loading/Loading';
import TreeNode from './TreeNode';
import axios from 'axios';
import CustomModal from './CustomModal';

const API_URL = "http://103.140.39.166:80/api/";
const pdfDownloadUrl = "../../data/detail.pdf";

const ContentAlbum = () => {
    const [topic, setTopic] = useState([]);
    const [searchTopic, setSearchTopic] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValueHeading, setSelectedValueHeading] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [allHeading, setAllHeading] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [topicResponse, headingResponse] = await Promise.all([
                axios.get(`${API_URL}topic/`),
                axios.get(`${API_URL}heading/`, { params: { all: true } })
            ]);

            setTopic(topicResponse.data);
            setAllHeading(headingResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedValue(selectedOption);
        const result = findTopicByName(selectedOption);
        if (result) {
            setSearchTopic([result]);
            result["isAllHeading"] = true;
        } else setSearchTopic([]);
        setSelectedValueHeading("");
    };

    const handleSelectChangeNTH2 = (e) => {
        const selectedOption = e.target.value;
        setSelectedValueHeading(selectedOption);
        const result = allHeading.find((item) => item.heading_name === selectedOption);
        if (result) {
            const result2 = findTopicById(result.topic);
            result2["heading"] = result.heading_id;
            setSearchTopic([result2]);
        } else setSearchTopic([]);
    };

    const findTopicByName = (name) => topic.find((item) => item.topic_name === name);
    const findTopicById = (id) => topic.find((item) => item.topic_id === id);

    const renderTree = () => {
        if (topic.length === 0) return <Loading />;
        return (
            <div className="tree">
                <ul>
                    {searchTopic.length === 0 ? topic.map((item) => (
                        <TreeNode key={item.topic_id} item={item} />
                    )) : searchTopic.map((item) => (
                        <TreeNode key={item.topic_id} item={item} />
                    ))}
                </ul>
            </div>
        );
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            if (search === "") return;
            const { data } = await axios.post(`${API_URL}search/`, { content: search });
            if (data.result) {
                setIsModalOpen(true);
                setSearch("");
                setSearchResult(data.result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="content-album">
            <div className="title">
                <h1>BỘ PHÁP ĐIỂN ĐIỆN TỬ</h1>
                <a className='download' href={pdfDownloadUrl} download="phapdien.pdf" >(Tải bộ pháp điển xuống <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>)</a>
            </div>
            <div className="search">
                <div>
                    <select name="topic" id="" value={selectedValue} onChange={handleSelectChange}>
                        <option value="---- Xem theo chủ đề ----">---- Xem theo chủ đề ----</option>
                        {topic && topic.length > 0 && topic.map((item) => (
                            <option key={item.topic_id} value={item.topic_name}>{item.topic_name}</option>
                        ))}
                    </select>
                    <select name="topic" id="" value={selectedValueHeading} onChange={handleSelectChangeNTH2}>
                        <option value="---- Xem theo đề mục ----">---- Xem theo đề mục ----</option>
                        {allHeading && allHeading.length > 0 && allHeading.map((item) => (
                            <option key={item.heading_id} title={item.heading_name} value={item.heading_name}>{item.heading_name}</option>
                        ))}
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
