import React from 'react';
import s from './Episode.module.css';

const Episode = (props) => {
   //отлавливаю статус 'идёт' и в зависимости от него отрисовываю,
   //если бы этот статус приходил динамично с сервера,я бы применил useEffect чтобы отследить изменения и вызывать //////функцию только в случае если придут измененные данные,ну и применил бы connect,если бы в приложении использовался //бы redux.
   const statusBlock = () => {
      if (props.live) {
         return(
            <div className={s.status} tabIndex="0">
               <div>{props.status}</div>
               <div className={s.liveStatus}>
                  <div className={s.circle}></div>
                  <div>Идёт</div>
               </div>           
         </div>
         )}
      else {
         return (<div className={s.status}> {props.status} </div>)
      }
   }
   //просто отображаю данные из пропсов и в зависимости от статуса selected применям нужным нам класс стилей
   return (
      <div className={(props.selected === props.episode) ? s.episode + ' ' + s.selected : s.episode}>
         <div className={s.imageBlock}>
            <img src="https://pics.sl/9e9/200/12cfbb0b.jpg" alt={'SerialName ' + props.episode + ' episode'} />
            <span className={s.duration}> {props.duration + ' мин.'} </span>
         </div>
         <div className={s.description}>
            <span>{props.episode + '-ая серия'}</span>
            {statusBlock()}
         </div>
      </div>
   )
}
export default Episode;