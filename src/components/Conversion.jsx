import '../css/conversion.css'
import video from '../assets/video.webm'

const Conversion = () => {
    const gems =[
        {name: 'Daily Gem Boost', status: 'Popular', gems: '33', ve : '157', desc: 'Watch add', color:'blue'},
        {name: 'Supper Reward', status: 'Best Value', gems: '35', ve : '216', desc: 'Watch add', color:'gold'},
        {name: 'Mega Reward', status: 'Daily', gems: '30', ve : '183', desc: 'Watch add', color:'blue'},
        // {name: 'Mega Reward', status: 'Daily', gems: '31', ve : '183', desc: 'Watch add', color:'blue'},
    ]
  return (
    <div className="con">
      <div>
        <h1>Available Conversions</h1>
        <p>Find the best conversion option for your Gems</p>
      </div>
      <div className='container-card'>
        {gems.map((value) => (
            <div
            key={value.gems}
            className={`cont-cnvrsn ${value.color}`}
            >
                <div className='card-name'>
                    <h4>{value.name}</h4>
                    <p className={ `status ${value.color}`} >{value.status}</p>
                </div>

                <div className='content'>
                    <div className='video'>
                        <video
                            src={video}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                    <div className='grm'>
                        <h4 >{value.gems} <span className='txt-gem'>Gems</span></h4>
                        <div className="arrow">
                            <span />
                            <span />
                        </div>
                        <h4 >{value.ve} <span className='txt-ve'>VEs</span></h4>
                        <p>{value.desc}</p>
                        <button 
                        type='button'
                        className='btn btn-primary'
                        >Convert Reward</button>
                    </div>
                </div>
            </div>

        ))}
      </div>
    </div>
  )
}

export default Conversion
