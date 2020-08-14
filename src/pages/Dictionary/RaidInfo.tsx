import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { getDicRaidBykey } from 'utils/DictionaryUtil';

const useStyles = makeStyles((theme) => ({

}));

function RaidInfo({match}: any) {
  const classes = useStyles();
  const { key } = match.params;

  const raid = getDicRaidBykey(key);

  return (
    <React.Fragment>
      {
        raid.length > 0 ?
          <Container>
            Raid Key - {key}
            Raid Name - {raid[0].name}
          </Container>
        :
          <Container>
            정보가 존재하지 않습니다.
          </Container>
      }
    </React.Fragment>
  );
}

export default RaidInfo;