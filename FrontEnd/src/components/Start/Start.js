import { useEffect, useState } from "react";
import './Start.css';
import imgPricing from '../../images/pricing.png'
import { useNavigate } from 'react-router-dom';
import { ContractData } from "../../contractData";

const {ethers} = require('ethers');
const provider = new ethers.providers.Web3Provider(window.ethereum);


const { ethereum } = window;

function Start() {
    const [ address, setAdress] = useState("");
    const navigate = useNavigate();

    const connect = async () => {
		if (typeof window.ethereum !== "undefined") {
			try {
				await ethereum.request({ method: "eth_requestAccounts" });
			} catch (error) {
				console.log(error);
			}
            //console.log("addmin " + ContractData.addressAdmin)
			const accs = await ethereum.request({ method: "eth_accounts" });
            const acc = ethers.utils.getAddress(accs[0]);
            if(acc ==  ContractData.addressAdmin) {
                console.log("admin day roi")
                navigate("/admin/session")
                return 
            }

            const responseUser = await fetch(`http://localhost:3001/users/${acc}`);
            const user = await responseUser.json()
            if (user.error == "User not found") {
                navigate("/info")
                return 
            }

            if(acc ==  ContractData.addressAdmin) {
                navigate("/")
            }

			setAdress(acc);
			console.log(address)
            navigate("/home")
			
		} else {
			console.log("Please install MetaMask");
		}
	};

    const getUser = async() => {
        const responseUser = await fetch(`http://localhost:3001/users`);
        const users = await responseUser.json()
    }

    useEffect( () => {
	},[address])

    return(
        <div className = 'startContainer' >
            <div className = 'infoAndImage'>
                <div className = 'infoContainer'>
                    <div className = 'textFunixPricingChain'>
                        Funix Pricing Chain
                    </div>
                    <div className = 'textDetail'>
                        Dapps Product Pricing with Blockchain technology platform.
                    </div>
                    <div>
                    </div>
                    <div className='buttonStartContainer'>
                        <button className='button button_start'
                        onClick={() => {connect();}}>Start</button>
                    </div>

                </div>
                <div className='image_container'>
                    <img className='imgpricing' src = {imgPricing}></img>
                </div>
            </div>
        </div>
    );
}

export default Start;
