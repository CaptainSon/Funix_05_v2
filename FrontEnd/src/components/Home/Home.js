import './Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const { ethers } = require("ethers");
const MainContractData = require('../../contracts/ContractInfo')
const provider = new ethers.providers.Web3Provider(window.ethereum);

function Home() {

    const mainContract = new ethers.Contract(MainContractData.address,MainContractData.abi, provider);

    const [modalOpenVote, setOpenVote] = React.useState(false);
    const [productAddChoose, setProductAddress] = useState("")
    const [productNamechoose, setProductName] = useState("")
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [arraySeesion, setArraySession] = useState([]);
    const [textAmount, setTexAmount] = useState("");
    const [pricingNum, setPricingNum] = useState(0);
    const [txtError, setTxtError] = useState("");
    const [account, setAccount] = useState("")
    const [txhash, setTxhash] = useState("");
    const [user, setUser] = useState({})
    const [deviationUser, setDevi] = useState()
    const navigate = useNavigate();

    const getAddress = (address) => {
        if(typeof address != "string") {
            return ""
        }
        const preAddress = address.slice(0,6) + "..." + address.slice(-5);
        console.log(preAddress)
        return preAddress
    }

    function openModal() {
        setTexAmount("");
        setIsOpen(true);
    }

    function openVoteModal() {
        setTexAmount("");
        setOpenVote(true);
    }
    
    function pre_vote(name, address) {
        const number =  parseInt(document.getElementById("num_vote_pri").value) *1000;
        setProductName(name)
        setProductAddress(address)
        setPricingNum(number)
        openVoteModal()
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setTexAmount("");
        setIsOpen(false);
        setOpenVote(false);
        fetchData();
    }

    window.ethereum.on('accountsChanged',async function (accounts) { 
        navigate("/")
    });

    const fetchData = async ()=> {
        const accs = await provider.send("eth_requestAccounts", []);
        const acc = ethers.utils.getAddress(accs[0]);
        setAccount(acc)
        const responseSession = await fetch(`http://localhost:3001/sessions/votting`);
        const responseUser = await fetch(`http://localhost:3001/users/${acc}`);
        const array = await responseSession.json()
        const user = await responseUser.json()
        if (user.error == "User not found") {
            setUser({})
            navigate("/")
            return 
        }
        setUser(user)
        const deviation = parseFloat(user.deviation.toFixed(3))
        setDevi(deviation)
        setArraySession(array)
    }

    const updateUserInfo = async() => {
        const signer =  provider.getSigner();
        const contractWithSig = mainContract.connect(signer);

        const newName = document.getElementById("input_name_update").value
        const newEmail = document.getElementById("input_name_email").value

        try {
            setTexAmount("pending");
            const update_user_tx = await contractWithSig.updateInfomationByUser(newName,newEmail)

            const waitUpdate = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(update_user_tx.hash);
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(update_user_tx.hash)
                    clearInterval(waitUpdate);
                }
            },4000)
        } catch (error) {
            const err = error.toString();
            const err_detail = "Error detail : " + err.substring(7,32);
            setTexAmount("error");
            setTxtError(err_detail);
        }
    }

    const Vote = async() => {
        const sessionContract = new ethers.Contract(productAddChoose,MainContractData.sessionABI, provider);
        const signer =  provider.getSigner();
        const sessionWithSig = sessionContract.connect(signer);
        try {
            setTexAmount("pending");
            const vote_tx = await sessionWithSig.vote(pricingNum)

            const waitUpdate = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(vote_tx.hash);
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(vote_tx.hash)
                    clearInterval(waitUpdate);
                }
            },4000)
        } catch (error) {
            const err = error.toString();
            const err_detail = "Error detail : " + err.substring(7,32);
            setTexAmount("error");
            setTxtError(err_detail);
        }
    }

    const GetNameState = (stateNumber) => {
        switch (stateNumber) {
            case 0:
                return <div className='state_con'>
                    <div className='creating_state state'>Creating</div>
                </div>;
            case 1:
                return <div className='state_con'>
                    <div className='voting_state state'>Voting</div>
                </div>;
            case 2:
                return <div className='state_con'>
                    <div className='creating_state state'>Closing</div>
                </div>
            case 3:
                return <div className='state_con'>
                    <div className='closed_state state'>Closed</div>
                </div>
        }
    }

    const getFriceDiv = (value) => {
        const ans = parseFloat(value / 1000)
        return ans 
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div className='home-container'>
            <div className='user_and_product'>
                <div className="user-container">
                    <div>
                        <div className='text_user_info'>User Information</div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>Name :</div>
                            <div className='text_data'>{user.fullName}</div>
                        </div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>Email :</div>
                            <div className='text_data'>{user.email}</div>
                        </div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>Session Joined :</div>
                            <div className='text_data'>{user.numberOfJoinedSession}</div>
                        </div>
                        <div className='disPlayFlex'>
                            <div className='text_label_create'>Deviation :</div>
                            <div className='text_data'>{deviationUser}</div>
                            <div className='phan_tram'>%</div>
                        </div>
                    </div>  
                    <div>
                        <button className='button_update_user_info' onClick={openModal}>Update</button>
                    </div>  
                </div>
                <div className='list-session-container'>
                    <div className='list_session_title text_user_info'>List Session</div>
                    <div className='list_session_info'>
                        {
                            arraySeesion.map((sessionrecord) => {
                                return(
                                    <div className='tag_session_container'>
                                        <div className='parent_imgOfOneSession'>
                                            <img className='imgOfOneSession' src={sessionrecord.productImage}/>
                                        </div>
                                        <div className='multi_info'>
                                            <div className='disPlayFlex name_and_state'>
                                                <div className='disPlayFlex'>
                                                    <div className='text_lable_product'>Name:</div>
                                                    <div className='product_name number_product'>{sessionrecord.productName}</div>
                                                </div>
                                                <div className='witdh_full'>
                                                    <div className='product_state text_lable_product state_parent'>{GetNameState(sessionrecord.state)}</div>
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    sessionrecord.state == 1 ? 
                                                    <div className='disPlayFlex'>
                                                        <div className='text_lable_product'>Price Voted:</div>
                                                        <div className='product_name number_product'>{sessionrecord.productName}</div>
                                                    </div>:<div></div>
                                                }
                                            </div>
                                            <div className='disPlayFlex descrtiption_container'>
                                                <div className='text_lable_product'>Description: </div>
                                                <div className='product_description text_lable_product'>{sessionrecord.productDescription}</div>
                                            </div>
                                            <div className='pricing_vote_container'>
                                                {
                                                    sessionrecord.state == 1 ?
                                                    <div>
                                                        <div className='disPlayFlex'>
                                                            <div className='text_lable_product pricing_title'>Pricing:</div>
                                                            <input id="num_vote_pri" type="number" className='input_pricing' defaultValue={0} min="0" max="1000000"/>
                                                            <button className='button_vote' onClick={() => {pre_vote(sessionrecord.productName,sessionrecord.addressSession)}}>vote</button>
                                                        </div>
                                                        <div></div>
                                                    </div>:<div></div>

                                                }
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="product-container">

                </div>
            </div>
            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className='init_modal'
            contentLabel="Example Modal"
            >
                <div className='update_user_info_container'>
                    <div className='update_user_title'>
                        Update User Information
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="pending" ? 
                            <div className='text_question text_pending'>Pending ...</div>
                            :
                            <div></div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="error" ? 
                            <div className=''>
                                <div className='error_container'>
                                    <div className='text_question text_error'>Error!! </div>
                                </div>
                                <div className='text_error'>{txtError}</div>
                                <div className='button_after_tx'>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>:<div></div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="success" ? 
                            <div>
                                <div className='success_container'>
                                    <div className='text_question text_success'>Success </div>
                                </div>
                                <div className=''>{txhash}</div>
                                <div className='button_after_tx'>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>
                            
                            :<div></div>
                        }
                    </div>
                    <div>
                        {
                            textAmount === "" ?
                            <div>
                                <div className='update_user'>
                                    <div className='update_name_and_email_container'>
                                        <div className='disPlayFlex group_input'>
                                            <div className='text_update_user'>Name: </div>
                                            <input id="input_name_update" className="name_user_update" type="text" defaultValue={user.fullName} />
                                        </div>
                                        <div className='disPlayFlex group_input'>
                                            <div className='text_update_user text_email_update'>Email: </div>
                                            <input id="input_name_email" className="name_user_update" type="text" defaultValue={user.email} />
                                        </div>
                                    </div>
                                </div>
                                <div className='button_container_update'>
                                    <button className='buttonUpdate' onClick={updateUserInfo}>Update</button>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>:<div></div>
                        }
                    </div>
                </div>
            </Modal>
            <Modal
            isOpen={modalOpenVote}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className='init_modal'
            contentLabel="Example Modal"
            >
                <div className='update_user_info_container'>
                    <div className='update_user_title'>
                        Pricing Product
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="pending" ? 
                            <div className='text_question text_pending'>Pending ...</div>
                            :
                            <div></div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="error" ? 
                            <div className=''>
                                <div className='error_container'>
                                    <div className='text_question text_error'>Error!! </div>
                                </div>
                                <div className='text_error'>{txtError}</div>
                                <div className='button_after_tx'>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>:<div></div>
                        }
                    </div>
                    <div className='process_update'>
                        {
                            textAmount ==="success" ? 
                            <div>
                                <div className='success_container'>
                                    <div className='text_question text_success'>Success </div>
                                </div>
                                <div className=''>{txhash}</div>
                                <div className='button_after_tx'>
                                    <button className='buttonCancel' onClick={closeModal}>Close</button>
                                </div>
                            </div>
                            
                            :<div></div>
                        }
                    </div>
                    <div>
                        {
                            textAmount === "" ?
                            <div>
                                <div className='question_container'>
                                        <div className='questtion'>Are you sure vote product </div>
                                        <div className='text_product_infor_choose'>{productNamechoose}</div>
                                        <div className='questtion'>with price</div>
                                        <div className='text_product_infor_choose'>{getFriceDiv(pricingNum)}</div>
                                        <div className='questtion'> ? </div>
                                </div>
                                <div className='button_container_update'>
                                    <button className='buttonUpdate' onClick={Vote}>Yes</button>
                                    <button className='buttonCancel' onClick={closeModal}>No</button>
                                </div>
                            </div>:<div></div>
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Home;