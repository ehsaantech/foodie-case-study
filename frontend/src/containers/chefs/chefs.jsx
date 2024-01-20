import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updatePageTitle } from '../../redux/slices/general.slice';
import { getChefUsers } from '../../redux/slices/chef.slice';

const Chefs = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const chefs = useSelector((state) => state.chef.chefs);


    const getAllChefUsers = () => {
        setIsLoading(true);
        dispatch(
            getChefUsers()
        ).then(() => {
            setIsLoading(false);
        })
    }

    const seeChefDetails = (id) => {
        navigate(`/food/chefs/${id}`)
        dispatch(updatePageTitle({
            title: "chef's Details"
        }))
    }

    useEffect(() => {
        // if(!chefs && !chefs?.length) {
        getAllChefUsers();
        // }
    }, [])

    useEffect(() => {
        if (chefs && chefs?.length) {
            setData(chefs);
        }
    }, [chefs])




    return (
        <div className='w-full mt-5'>
            <div className='flex justify-start items-center gap-5 flex-wrap'>
                {data?.map((e) => (
                    <div className='shadow w-1/4 border-2 border-slate-100 cursor-pointer' onClick={() => seeChefDetails(e.id)}>
                        <img className='w-full' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAAD29fr8/Pz29fn29vj5+fn09PTt7e3w8PDq6ur///339/fFxcXn5+fBwcHT09Pf39+np6e8vLzLy8ugoKBubm57e3tJSUmurq60tLTPz8/h4eHa2toxMTFoaGiJiYmbm5uRkZEoKChSUlIcHBwjIyNAQEB1dXVfX1+GhoYTExMeHh5WVlYwMDA5OTlsY0GVAAAN3klEQVR4nO1diXqqOhAmJxKWsu8guKB1o+r7v92dACogCj23VThf/vvd0wpU8zuT2RIGjmNgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYPg7EEUQCH73KH4cmFLCiXVYn1cIoc/z+hDK5eF/BZo1Rw1sLQIk3z2wHwBwUKKgIDU7HpaWZbmL/Sl/7f4LBAmnLTLK5rSLElmUc4iiaKRnOHhOxi9F0af0Ml8FdqIkKApRFEGUNU2UIypI690D/F8A8bi5cloakKsJCwuyJosLOLkc72QES2nMqEWxJYG0nZc0wc6lOFaGhQBXkSQ8ooBl0fhEyHjtqH4IIEBM/UMqC88uE+QpQhthjIqKOXJEaG0oXdeJEUKHMfp+zO1BgDXrgjEBO6oQQOUwkQ4IxS8f3/8G5g7oU70SwZPJH/pfAfgNfqUnPz4+QIpntA8P3nzuu6o0glBOkRMjVrgYrUyusKD4wqwBHucMOU6thHLrsM3sDgeie9zkDt7zTloZb/N8O0GgyOOcoVsLVzeDjQEwZ3owwCCNbBvC7LA4yPOTByKk6soTkDMlmB09zzuWHIcayhEaoKSxBNELWH8t0+DYQ24ViuD0fRljQaLB6jJXARQBxcGRxGuEPOCXuz/Qz3jNcQ/186qnE0VDq2n5DhCuypK9RUUoNzBgAgQtUbyaCcyp+hP9vALvT0L1bSDvWFKK6TtYPMUOoVCshi+YW046ZfjnT7wRwU1iXFgl+r8kTr+Aov0mIo8ABv8g4WrwhXGi9ZBhZPAXkI/yL4WYplXam6g8wBadxYYjw1I3P5Ah2NoLrhEQ0YDidlC2xgTz14ywMf+nhwwrmPCXJAsTE1IO9+U0nsBCG635lT8KZSqMGgdAU4v3wLnaZ9IbmDzCHO3vVarLzmByT/qm6RCPL15HoBPrNuuOH0sPQL+Ru++A5z8uf03A2DxNLV+LbWtB6SFDsJscnW13iszzt7+OBlWlCiDOasGjmVjo4oerc6R+CV+xx+RrSOb0+ODrbqU4KU/KaNa0R3yVEcS54q+PvB8wWJqWeUgXYDDhy+xpovC8wl/TW/jFL2wJTf3pKYE0FmymqF0z3oIl2t8fxEVEjUnuziEy4z4qJ8Ef7H20qEZBNFk0by5CyNDhtwb8beitzkt8FlsKEMg6Z+RdgjPNpTnX/Fb54Miq7Xt7EwiNlHE1KM1/OA/yPHo6QLtYsCEjmbu6Gh7OSKXm06lcJZ5R8Mvj7gtMXf65GpZeUoXUaqUIZ3coAHEJTr4+QwvjKtV1t3qxMSiGYBX86qGEK2h6u/Zi7w6d7LwObOphevDTUKMSDLjK1UQ/ofUvj/w7OELSWsl3xH1ZaJuvarXQIsGSA7S1L54gTqaGCRcnCCXVC42o8a29F1jOgOJUvh7w8joE5sgBHRpejVgw+XS5fpDDZzSvvhbtdFBpMOYcmEye7cS4eGle6tiK9YV883al5q7QaqmKNeUtluGqKzSCrQYIda0JvBa0rvu5sHWjkM52X1pU4oBrP/uWPlUjd7dFaLWwp81sGYPzmN1ecoJug6R3rxt9L8h0rSnbLyM1AecYguUvs73YTo/ZpRbqWara1FCO2tFqfU22bRXSfHlYFX4YTOLn5c6vYH7QJbCM1xAtUe3IWi6t0Nb1aVsBBmfV5RnD1tX1EOttAGzq7nIZOqbA7avzCovJ1FEdx5Dbd5iAiq8uv8e6rdowCY+DEuAFlUHZddv4HLuLZyCUn34AkZ6GVMS44lpPhAkEgXP/5KcskAqJrqqWRyftakAJ/iPM+2+zMIFSrMS2lfrrwiZ9Q/7vQ4TOfRmGCG1IdLqusAXO8BdKAVr/ujV4TBqCGulxtVodU2qiRkCQ1qeaRd1mSfVyYI0GlOx+Awt0vD+IJS0xAElcWQaYoXriNBbotYqnNI0W86C+ATPwLEcoaqP6+8b59xARmuaSIYnlFYu72eZ0Do77uQeYz/fr8yckv6mBxroxakP9hRDNwQGc9166tCIbwrYCqg4hznQ6NRzVpmuiI9xSw9G0eDfdfwb+MrRVgDM1EjPW5HwPZtUbQGKBBhnBdIDuGsr80ElMTVKe7pKRQH1HEMK0wEJfvTyiQB3+GG0p3UjST/k26DRGfnlO1M+ABGNl6PRl6KHVsLeztSOvTtXmIZHiqR5Z6c6bH9cBYL33dsvIIO5YLU1UBjWCaNhLfz/L0AOsxuktqC09S4brB6sKmezza7PaBsfjcb09fX19Xo6b3W83ONDFiZvUtnPfipxElmqrhFgQTTU6zGlcOkZbk8suOy4iQ+4avjbKuFRF6/RWG+1K2seQ1DeRDGUZ/rcwwE2wDAwMDAzDA/5O5XqMngVf/6kf4or4BbedGBdw7Ptac+iPqCjpTv3tAf04yCxbbMvb1/J/nHR9nh0dCLO92SzwbbrTApeS9vwAyWMTZYIMLixCUxi5s7tlgpec6hiRC8eUU4a0JbgfDBTjMieK069bDhzGlYTYL68wJW5Ytx/0QVzuHxHDda1kESa1l+dlUctR8zvWxoUTWqjRsk6PrjJJzSPbRei4n6hlm83A4bSXnWS6XNiCMTZXUNuIUFu6aTk+ulnIUYmI6arBw5PznSiLRmEx8+PxCbDQOTJNj58FnWzl0cZChXtQdP9cVhI/g0N+l/qbR/t/gAXNTMz79hFEjBMzlsZYz++HMQutAdz42f6SgWHgGKfGEs7uvyg4ToouWvdcFdSG10OhE2WbL9/sIR3FoHf3jU2KuIy7F0bn0DXVQyPcuYe58patpfN85IpjF/nVgO6P6Ydrmuuqz8KyWLfK9P9rWDfIdMO+5g2W2m5SQbaSY1/LN6NLn24MUag/oJjobiUZHtKteH1QKcZkoX7XdRZei6q9ryWJY/OKp8rYW6RIDH1Rz4LPYyKoCZhuF6pQVKt2BJjEqnuuE0RLThhYT5o2UCmIupqHMsfq8C210mCJ7vk+Nvjle/ck3R58wQ2rBysvVQDTWi3Gut2mTZKKBb1gVmy5kS1fHbKymoe1JZZNn2rGBuBe9gTFarMOBfCKFqA4LyAfkoef8CYUi2WStdrqUtWkaDUmad6FT3aWzfobQkHtBllJD1ZuvuAxJGkK+h7tp1J1dxfQkWoF7wPhRMfd3vGbT2sttDgii1N4twde9D0wDxnaJZIm1bt5Yg6nVSpLI7yr8c/apAXvZPgoG4K20oEJYQAqaEqa3BZZOrdVp0XDw1OxPtiwRzRZNMFfBuGb953SbgqQ+mxcWZS1B2MhpWP3kkPTuqhPVvol2g/bhSk7f++uxRDcdhBJsqxpDzIIQjuWUIWz6gZ0XlkCbv9DWZNlMQK1noW/M/huENqQa+7Q9uPa822IsRDVDOg+6qN8En1f0ZnTTj1vsqpTlCYS5dc6AyuwZ016PXaTUqMK761JMCGnPzTi74BOIeTm/DTx+XDVSgTqfc8HUDECRxe9Y3GD7p8Q8gHwT64BflcHuPmLgIwUn+B7r9dTzKknsVuA04sDPC+Mli1EPT4nF6N4Ul9PUcgMrcvEmKUDDJaP7p35yPH0g3iY57KRCd/aRPYT8JZUhI9sIrUksl/4haglI7pYmh4MKUWYii+/Q1/dSk8IAoRDrptqmTLcgDFPO0TzRWWjB0M6GWVx+2o9RYmsxY9UNK94Z/tQrhy4/HZtUVc0nu31YdTemC+1p5jzU/GZisq7tPWhAS3dLvk+kgGK4vKlXaOMlfRERTHJk4J7r07uGinmguzBEeaitHpVhErHM3MeRtoUWnsMQoSWVpETyrL7UwVNdGbdl/0IgOFyJz0jyBntPSBaGRZy7J5jiib5y1cZG3GjaU+DL3XeWjLDSjtDQu1P59ghgPp6TSUOc/NQfpobKPo6b78Sp2lScxX385CCRAdL7ENRDl/UKtIIxOfJj6gHtPPolPr7WgvS1v7QExr4bPtoqiAFrzE2gSE8/75j/Uz3++Yh6VdVhh9t/aGLpdSQ8M/bElAIyfb/Dr4bmHMOXSt9iT5LQSWLpKm+KMM3pAihTbFKtaC+stOmksOvRzbw9vMOCYJ66psFRxtFobvm8U09Bd0sCsc65uudktsh/HoahTnT7vwMR//y4SLaHT9rruOThqJOJnnF0acP2/nTaW4wZ/96hRH3qLColCGAqM3lXwiySVNR/2DTNop4ro9f7Cgo/G/0qq8Aw137pR85xXuPWLLmle4ax2/fL9zj7TGn259++6V5pkSbQzftzaT82TnHh3FHtG5nT/MARXj8iKQhjL8LoKV29rQ5GRaU8TN83pmTjFuGXDfDJw/yGgfDqZ113KXVHoKPh6FhZ9fFlHafgSsPK6Mx981JjoNhbGdR3v44DCUO3zvx3Cle9HTCY8NVr05yHAwlO6NNAvOA02k5T596eGOIaVl1T0bFkOgZJZYXvGctnp+6/RtDI4+87fLZSa8f7V9huqGZapE9tc5Dak4vDIvNU2n54J2Xj/XvoG3p/q1829Op5XRe5G7IMCpfvXikf405rYbn87DtDu2c4bX4jekGqWBSmNVxTEOAlT/aQbSsu0d53UCE0kVwqmuXucVoGOK8MXnxGI/HuYBSMKSPt7q6xhcO8gXAJcPbE+gm/9qdenex22iUtDfunp737gH9PGoVDaX1IfMjR7VEPOGVf05JKSoy/BdFyNES8aUuNRnbTTO9gS+1xHcP5BdB6NaM0USkf4l/0sYwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMPw0/gMf1b9mtQv6NgAAAABJRU5ErkJggg==" alt="chef Image" />
                        <div className='text-2xl text-center w-full p-2 font-bold'>{e.username}</div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Chefs