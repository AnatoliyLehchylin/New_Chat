export const mainContainer = {
    paddingLeft: '0',
    paddingRight: '0',
    height: '100%',
    boxSizing: 'border-box',
    width: '100%'
};

export const mainAvatar = {
    width: '35px',
    height: '35px',
    borderRadius: '50%'
};

export const postAvatar = {
    width: '25px',
    height: '25px',
    borderRadius: '50%'
};

export const layout = {
    width: '100%',
    minWidth: '320px',
    padding: 0,
    '&.MuiContainer-root': {paddingLeft: '0px', paddingRight: '0px'}
};

export const layoutName = {
    maxWidth: '215px',
    color: '#faf6f1',
    fontSize: '18px',
    fontWeight: '500',
    paddingLeft: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};

export const buttonWrap = {
    minWidth: '320px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    backgroundColor: '#67676c',
    paddingTop: '5px'
}

export const avatarNameWrapp = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '15px'
}

export const containerChat = {
    display: 'flex',
    boxSizing: 'border-box',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    flexDirection: 'column',
    pt: '10px',
    width: '100%',
    height: 'calc(100% - 44.6px)',
    backgroundColor: 'black',
    '&.MuiContainer-root': {paddingLeft: '0px', paddingRight: '0px'},
};

export const textField = {
    padding: '0 15px', '& input': {
        color: '#FFFFFF'
    }, '& fieldset': {
        borderColor: '#1976d2', borderWidth: 2
    }, '&:hover fieldset': {
        borderColor: '#1976d2 !important',
    }
};

export const boxWrappChat = {
    fontSize: '30px',
    fontWeight: '500',
    color: 'rebeccapurple',
    // height: '76%',
    // flexGrow: '1',
    overflowY: 'scroll',
    padding: '0 15px',
};

export const wrappPost = {
    // width: '290px',
    color: '#faf6f1',
    marginBottom: '15px',
    borderBottomRightRadius: '10px',
    borderTopLeftRadius: '10px'
}

export const userPost = {
    color: '#1976d2',
    // textAlign: 'left',
    // margin: '0',
    paddingLeft: '5px',
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis', /* Добавляет многоточие (...) в конце обрезанного текста */
    whiteSpace: 'nowrap'
}

export const textPost = {
    // width: '100%',
    // textAlign: 'left',
    paddingLeft: '10px',
    paddingRight: '10px',
    overflowWrap: 'break-word'
}

export const timePost = {
    // textAlign: 'right',
    color: '#bebccb',
    paddingRight: '10px',
    fontSize: '12px'
}

export const wrappButton = {
    display: 'flex',
    justifyContent: 'space-around',
    paddingBottom: '5px',
    paddingTop: '5px'
}

export const button = {
    width: '24px',
    height: '24px',
    color: 'black',
    padding: '0'
}

export const loadingData = {
    display: 'flex',
    justifyContent: 'center',
    color: '#fa0404',
    fontSize: '20px',
    fontWeight: '400',
    marginRight: '30px',
    animation: 'blink 400ms alternate infinite',
    '@keyframes blink': {
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0.5,
        },
    },
};

export const startPageLeft = {
    fontSize: '24px',
    whiteSpace: 'nowrap',
    animation: 'shakeAnimation 0.5s infinite alternate ease-in-out',
    '@keyframes shakeAnimation': {
        '0%, 100%': {
            transform: 'translateX(0)'
        },
        '25%': {
            transform: 'translateX(-2px)'
        },
        '50%': {
            transform: 'translateX(2px)'
        },
        '75%': {
            transform: 'translateX(-1px)'
        },
    },
};

export const startPageLeftImg = {
    backgroundColor: '#faf6f1',
    width: '100px',
    height: '100px',
    rotate: '-100deg'
};

export const startPageRight = {
    fontSize: '24px',
    whiteSpace: 'nowrap',
    animation: 'shakeAnimation 0.5s infinite alternate ease-out',
    '@keyframes shakeAnimation': {
        '0%, 100%': {
            transform: 'translateX(0) translateY(0)'
        },
        '25%': {
            transform: 'translateX(2px) translateY(-2px)'
        },
        '50%': {
            transform: 'translateX(-1px) translateY(2px)'
        },
        '75%': {
            transform: 'translateX(2px) translateY(-3px)'
        },
    },
};

export const startPageRightImg = {
    backgroundColor: '#faf6f1',
    width: '100px',
    height: '100px',
    rotate: '-80deg'
};

export const badge = {
    '& .MuiBadge-badge': {
        right: -8,
        top: 5,
    },
};

export const editPost = {
    fontSize: '10px',
    paddingLeft: '5px',
    color: '#bdb237',
    display: 'flex',
    alignItems: 'flex-end'
};

export const footerContainer = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '5px'
};

export const startPage = {
    display: 'flex',
    margin: '0 auto',
    paddingTop: '100px',
    justifyContent: 'space-around',
    width: '100%'
};
