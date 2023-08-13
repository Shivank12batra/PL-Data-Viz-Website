import React from 'react'
import shotmap from '../assets/shotmap.jpg'
import cumulativeChart from '../assets/cumulativeChart.jpg'
import networkChart from '../assets/networkChart.jpg'

const Glossary = () => {
  return (
    <div className='bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent min-h-screen'>
      <h1 className='text-white text-4xl font-bold mt-32 mb-6 mx-auto underline underline-offset-4 text-center'>
        GLOSSARY
      </h1>
      <div className='text-white w-4/5 mx-auto my-8'>
        <p>
          Welcome to our Football Analytics Glossary! If you're a casual football fan, you might have been perplexed by terms like xG, psxG, passing network, and more. Don't worry; we've got you covered! These seemingly intimidating terms often reveal meaningful insights that can significantly enhance your understanding of the fast-paced world of football.
        </p>
        <p className='my-4'>
          This glossary is designed to demystify these concepts, making it easier for you to comprehend the intricate details of the beautiful game. Whether you're curious about advanced statistics or want to dissect the tactics behind each match, this glossary will serve as your guide.
        </p>
        <div className='my-8'>
          <h1 className='text-2xl text-center font-bold mb-4 underline underline-offset-4'>
            Key Terms
          </h1>
          <p className='font-bold underline underline-offset-4 mb-2'>xG (Expected Goals):</p>
          <p className='my-4'>
            Probably the most important statistic in football analytics right now and also the reason behind it being the most referenced one in our site as well. 
          </p>
          <p className='my-4'>
            xG, or Expected Goals, has indeed emerged as a pivotal statistic in the field of football analytics. It provides a <span className='font-bold'>quantitative measure of the quality of scoring opportunities</span> a team or player creates or concedes during a match. This statistic has gained significant popularity among analysts, coaches, and fans alike due to its ability to offer insights beyond traditional metrics like goals scored. 
          </p>
          <p className='my-4'>
            The concept behind xG revolves around assessing the <span className='font-bold'>likelihood</span> of a shot resulting in a goal based on various factors such as shot location, shot type, assist type, defensive pressure, and more. By analyzing a large dataset of historical shots and their outcomes, machine learning algorithms can be trained to assign a probability to each shot attempt, indicating the expected likelihood of it becoming a goal.
          </p>
          <p className='my-4'>
            Still confused? No worries, here are some examples to help you make it understand it much more intuitively. 
          </p>
          <img src={shotmap} alt='xGShot' className='my-4 mx-auto' width={300} height={300}/>
          <p className='my-4'>
            As you can see from the image above and the formal definition will start to make sense, the shots taken from a closer range will naturely have a higher probability in resulting to a goal hence, a higher 'xG' value as well. And yes, there are other factors (angle of shot, defensive pressure etc.) that the model takes into account as well but shot location is often the most influencing one of them all. 
          </p>
          <p className='my-4'>
            What is the real usecase of xG then? There are plethora of them! but the common theme in all of them is that it helps measure the <span className='font-bold'>underlying performance</span> of a team or an individual player. For example, in our cumulative xG chart, we tried to measure the underlying performance of the teams. We have seen countless scenarios where the team that lost was actually the one that was dominating the whole game!
          </p>
          <img src={cumulativeChart} alt='xGChart' className='my-4 mx-auto' width={300} height={300}/>
          <p className='my-4'>
            As you can see from the visual above, the game ended 1-1, (the goals are represented by the star svg) but the chart also gives us some more info, the team represented by the blue line had an expected cumulative xG of around 2.2 which means that based on the chances created throughout the game, they should have ideally scored two goals instead of one.
          </p>
          <p className='my-4'>
            xG is not the be all and end all, and just like everything in statistics, it should be applied taking things into proper context. If you made it this far and found this really interesting and would like to explore it more, here is a curated list of readings for you:
          </p>
          <div>
            <a href='https://theanalyst.com/eu/2023/08/what-is-expected-goals-xg/' target='_blank' className='font-bold'>
              https://theanalyst.com/eu/2023/08/what-is-expected-goals-xg/
            </a>
          </div>
          <div>
            <a href='https://saturdays.substack.com/p/game-states-and-when-expected-goals-arent-enough' className='font-bold'>
              https://saturdays.substack.com/p/game-states-and-when-expected-goals-arent-enough
            </a>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Glossary