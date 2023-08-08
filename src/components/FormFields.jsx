import { Button } from '@mui/material'
import { useRef } from 'react'

export default function FormUploadButton(props) {
    console.log('Props:', props)
    return (
        <Button
            variant="outlined"
            color="primary"
            size="medium"
            id={props.id}
            onClick={() => !props.loader && props.fileRef.current.click()}
            disabled={props.disabled}
            sx={{ fontWeight: 'bold' }}
        >
            {props.label}
            <input
                hidden
                ref={props.fileRef}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet application/vnd.ms-excel"
                type="file"
                onChange={props.onChange}
            ></input>
        </Button>
    )
}

// const benchmarkProductivityFile = useRef() as MutableRefObject<HTMLInputElement>;

//  const handleChange = (event: any) => {
//             event.preventDefault();
//             const fileObj = event.target.files && event.target.files[0];
//             if (fileObj) {
//                 const context = {
//                     file: fileObj
//                 }

//                 // @ts-ignore
//                 dispatch(uploadProductivityFile(context, warehouseState.planning_warehouse?.id, fileObj.name))
//                 // @ts-ignore
//                 dispatch(getBenchmarkProductivityData(warehouseState.planning_warehouse?.id))
//             }
//         }
