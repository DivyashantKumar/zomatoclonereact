
import {axiosInstanceWithoutToken} from '../api/axios';
import { useEffect, useState } from 'react';
import Foodcard from './Foodcard';
import '../style/Foodcard.css';
import { BaseUrl } from '../api/index';

function QuickSearchList() {

    let [quickSearchList, setQuickSearchList] = useState([]);

    useEffect(() => {
        axiosInstanceWithoutToken.get(`${BaseUrl}/getQuickResurantFilters`).then(res => {
            // console.log(res.data.data);

            setQuickSearchList(res.data.data);
            
            // console.log("quickSearchList :")
            // console.log(quickSearchList);
        })
    },[]); 

    return (
        <div className = 'foodcardContainer'>
            {/* {JSON.stringify(quickSearchList)} */}
            {
                quickSearchList.map((item, index) => {
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