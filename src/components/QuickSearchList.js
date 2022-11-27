
import { axiosInstanceWithoutToken } from '../api/axios';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Foodcard from './Foodcard';
import '../style/Foodcard.css';
import { BaseUrl } from '../api/index';


function QuickSearchList() {
    let [quickSearchList, setQuickSearchList] = useState([]);

    useEffect(() => {
        if(window.innerWidth > 500){
            axiosInstanceWithoutToken.get(`${BaseUrl}/getQuickResurantFilters`).then(res => {
                setQuickSearchList(res.data.data);
            }) 
        }else {
            axiosInstanceWithoutToken.get(`${BaseUrl}/getQuickResurantFilters`).then(res => {
                const data = res.data.data.filter((item) => {
                    return item.code === 'BRF'|| item.code === 'LCH'|| item.code === 'SKS';
                })
                setQuickSearchList(data);
                console.log(data)
            }) 
        }           
    }, []);

    return (
        <div id="fcc" className='foodcardContainer'>
            {/* {JSON.stringify(quickSearchList)} */}
            {
                quickSearchList?.map((item, index) => {
                    return (
                        <div key={item.code}>
                            <Foodcard
                                code={item.code}
                                image={item.image}
                                time={item.timing}
                                description={item.description}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default QuickSearchList;