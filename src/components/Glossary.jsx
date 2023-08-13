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
      <div className='text-white text-center sm:text-left sm:w-4/5 mx-auto my-8'>
        <p>
          Welcome to our Football Analytics Glossary! If you're a casual football fan, you might have been perplexed by terms like xG, psxG, passing network, and more. Don't worry; we've got you covered! These seemingly intimidating terms often reveal meaningful insights that can significantly enhance your understanding of the fast-paced world of football.
        </p>
        <p className='my-4'>
          This glossary is designed to demystify these concepts, making it easier for you to comprehend the intricate details of the beautiful game. Whether you're curious about advanced statistics or want to dissect the tactics behind each match, this glossary will serve as your guide.
        </p>
        <div className='my-8'>
          <h1 className='text-2xl text-center font-bold mb-4 underline underline-offset-4'>
            KEY TERMS
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
          <p className='my-4'>
            Now, if you have already understood about the concept of xG then it would become really easy to comprehend about metrics/charts that are built on top of that concept.
          </p>
          <p className='font-bold underline underline-offset-4 my-2'>PSxG (Post Shot Expected Goals):</p>
          <p className='my-4'>
            The next metric is post shot xG(PSxG). Post-Shot Expected Goals (PsxG) is a statistic that gives us an idea of how likely a shot will result in a goal, even after the shot has been taken. This takes into account various factors like where the shot was taken from, the type of shot, and the abilities of the goalkeeper. It's like a way to measure the quality of a scoring opportunity.
          </p>
          <p className='my-4'>
            Example, imagine a striker takes a shot from a difficult angle, but the goalkeeper makes a diving save and prevents the ball from going into the net. Even though the shot looked challenging, the goalkeeper's save means that the shot didn't turn into a goal. PsxG helps us understand whether that shot was actually difficult to save or if the goalkeeper's skill made the difference.
          </p>
          <p className='my-4'>
            Use Case of PsxG - Goalkeeper Analysis (GA):
            PsxG can be used to analyze goalkeepers in a more detailed way. Goalkeeper Analysis (GA) using PsxG involves comparing a goalkeeper's actual saves with the expected goals from the shots they faced. If a goalkeeper consistently makes saves that are higher than the expected goals of those shots, it suggests they are performing exceptionally well. On the other hand, if a goalkeeper concedes goals from shots with low expected goals, it might indicate areas for improvement in their positioning or decision-making.
          </p>
          <h1 className='text-2xl text-center font-bold mb-4 underline underline-offset-4'>
            HOW TO INTEPRET THE GRAPHS?
          </h1>
          <p className='my-4'>
            Again, if you have already understood the concept of xG, charts such as cumulative xG and shotmap would start to make sense. But there are other charts that might still need some amount of explaination and for that, we have got you covered as well!
          </p>
          <p className='font-bold underline underline-offset-4 my-2'>
            Passing Network Chart:
          </p>
          <p className='my-4'>
            The passing network chart showcases the average positions of the players (when they received passes) on the pitch and the passing relationship/dynamics between the team players. The stronger the dynamic the thicker is the line connecting them.
          </p>
          <img src={networkChart} alt='xGChart' className='my-4 mx-auto' width={300} height={300}/>
          <p className='font-bold underline underline-offset-4 my-2'>
            Player Report Stats:
          </p>
          <p className='my-4'>
            The player report on the player stats page has a toggle to switch between percentile or per 90 minutes. 
          </p>
          <p className='my-4'>
            Percentile section is the percentile rank shown for that particular player in that particular stat compared to players of the same position in the whole league. Let's say Harry Kane, a prominent striker for Tottenham Hotspur, has an xG percentile value of 95 in the Premier League for a specific season. This means that out of all the strikers (players in the same position) who have participated in the Premier League during that season, Harry Kane's xG value is higher than approximately 85% of them. In simpler terms, he ranks better than 95% of his fellow strikers in terms of xG.
          </p>
          <p className='my-4'>
            On the other hand, the "per 90 minutes" statistic is a way of standardizing and comparing player performance. This is often used to provide a fair comparison of players' contributions, regardless of the amount of playing time they have had. Imagine you have two players, Player A and Player B. Player A has played in 10 matches, each lasting a different amount of time, while Player B has played in 5 matches. If you just compare their total goals or assists, it might not accurately reflect their actual contributions because Player A might have played more minutes overall.
          </p>
          <p className='my-4'>
            Here's how you'd calculate a statistic per 90 minutes:
          </p>
          <p>
            For Player A: Total goals = 8, Total minutes played = 600 minutes
          </p>
          <p>
            For Player B: Total goals = 4, Total minutes played = 270 minutes
          </p>
          <p className='my-4'>
            Calculate Goals Per 90 Minutes:
          </p>
          <p>
            For Player A: (8 goals / 600 minutes) * 90 = 1.2 goals per 90 minutes
          </p>
          <p>
            For Player B: (4 goals / 270 minutes) * 90 = 1.33 goals per 90 minutes
          </p>
          <p className='my-4'>
            I hope that we were able to explain all the key terms and that you would have a smooth experience navigating the website. If in case, there is anything that you need more clarity on, you can contact me <a href='https://www.linkedin.com/in/shivank-batra-4594b9202/' target='_blank' className='underline font-bold'>here</a>
          </p>
        </div>
      </div>
    </div> 
  )
}

export default Glossary