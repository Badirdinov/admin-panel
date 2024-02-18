import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actions, fetchTables } from "../../../redux/slice/tables";


import './tables.css'
import CustomButton from "../../ui/button";
import { apiToken } from "../../../axios";

const TablesPage = () => {
    const dispatch = useAppDispatch()
    const { data } = useAppSelector(state => state.tables)
    
    const handeDeleteTable = (id: number) => {
        apiToken.delete(`/menu/tables/${id}`)
          .then((res) => {
              if(res) dispatch(actions.deleteTable(id))
          }).catch((error) => {
            console.log(error)
        })
    }
    
    const addTable = () => {
    
    }
    
    useEffect(() => {
        dispatch(fetchTables())
    }, [ dispatch ]);
    
    return (
      <div className='tables'>
          <div className='tables__header'>
              <CustomButton
                onClick={() => addTable()}
                variant={ 'primary' }
              >
                  Добавить стол
              </CustomButton>
          </div>
          <div className='tables__items'>
              {data && data.results ? [...data.results].reverse().map((item) => (
                <div className='table' key={item.id}>
                    <div className='table_number'>
                        <p>Номер стола<span>{item.name}</span></p>
                    </div>
                    <CustomButton
                      onClick={() => handeDeleteTable(item.id)}
                      variant={'danger'}>
                        Удалить
                    </CustomButton>
                </div>
              )) : null}
          </div>
      </div>
    );
};

export default TablesPage;
