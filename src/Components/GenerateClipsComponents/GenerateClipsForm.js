import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import "./GenerateClips.scss";



const GenerateClipsForm = () => {
  const defaultGamerTags = [
    { value: "derpderppyderp", label: "derpderppyderp | christian" },
    { value: "JakeStub", label: "JakeStub | jake" },
    { value: "StackableOrange", label: "StackableOrange | mel" },
    { value: "fellowblowpop", label: "fellowblowpop | drew" },
    { value: "CrapperVlogz", label: "CrapperVlogz | crapper" },
    { value: "Mandimanatee", label: "Mandimanatee | manDerp" },
    { value: "", label: "**You can also type your own gamertag**" },
  ];

  const clipLengths = [
    { value: '10', label: "short (~10 snips)" },
    { value: '20', label: "medium (~20 snips)" },
    { value: '30', label: "long (~30 snips)" },
  ];
  
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [selectedClipLimit, setSelectedClipLimit] = useState('');
  const [selectedGameOption, setSelectedGameOption] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [didUpload, setDidUpload] = useState(false);
  
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
          const args = {
              event_tags: selectedTriggers,
              export_clip_limit: Number(selectedClipLimit),
              game_name: selectedGameOption, // Assuming this value has the game name
              game_title_id: selectedGameOption, // Assuming this value has the game title id
              gamertag: selectedUser,
            };
            
            let docName = new Date().toISOString();
            let uploadDict = {
              job_id: docName,
              job_creation_time: serverTimestamp(),
              job_type: "generate_moment",
              job_status: "open",
              args: { ...args, clip_limit: 1000 },
            };
            
            setLoading(true);
            const ref = doc(db, "server_jobs", docName);
            await setDoc(ref, uploadDict);
            console.log("Document written with ID: ", ref.id);
            setLoading(false);
            setDidUpload(true);
          };
          
          return (
            <div className='Generate_Container'>
            <div className='Generate_Wrapper'>
                <form onSubmit={handleSubmit} class="Generate_Form">
                    <div >
                        <label htmlFor="triggers">Triggers</label>
                        <select
                            multiple
                            id="triggers"
                            value={selectedTriggers}
                            onChange={(e) => setSelectedTriggers(Array.from(e.target.selectedOptions, option => option.value))}
                            >
                            {/* Populate event_tags options here */}
                        </select>
                    </div>
                    <div className='clip_length_input'>
                        <label htmlFor="clipLength">Clip Length</label>
                        <select
                            id="clipLength"
                            value={selectedClipLimit}
                            onChange={(e) => setSelectedClipLimit(e.target.value)}
                            >
                            {clipLengths.map((clip, index) => (
                              <option key={index} value={clip.value}>
                                    {clip.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='game_input'>
                        <label htmlFor="game">Game</label>
                        <select
                            id="game"
                            value={selectedGameOption}
                            onChange={(e) => setSelectedGameOption(e.target.value)}
                            >
                            {/* Populate game options here */}
                        </select>
                    </div>
                    <div className='gamer_tag_input'>
                        <label htmlFor="user">User</label>
                        <select
                            id="user"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            >
                            {defaultGamerTags.map((user, index) => (
                              <option key={index} value={user.value}>
                                    {user.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className='clip_submit_button' type="submit">Generate Clip</button>
                </form>
            </div>
        </div>
    );
};


export default GenerateClipsForm;
