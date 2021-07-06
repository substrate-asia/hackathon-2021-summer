package com.tang.data_entity;

import android.graphics.Bitmap;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

//参与评定弹窗界面数据
public class PartInFilmEvaluateData {
    String filmId;
    Bitmap filmImage;
    String filmName;
    int evaScore;//主观评分。
    int forcastBoxOffice;//票房。
    String partInTickNum; //投票数
    String fightSponsor;//争夺发起方
    int evaCommitNum;
    //可能还需要用户Id


    public String getFilmId() {
        return filmId;
    }

    public void setFilmId(String filmId) {
        this.filmId = filmId;
    }

    public Bitmap getFilmImage() {
        return filmImage;
    }

    public void setFilmImage(Bitmap filmImage) {
        this.filmImage = filmImage;
    }

    public String getFilmName() {
        return filmName;
    }

    public void setFilmName(String filmName) {
        this.filmName = filmName;
    }

    public int getEvaScore() {
        return evaScore;
    }

    public void setEvaScore(int evaScore) {
        this.evaScore = evaScore;
    }

    public int getForcastBoxOffice() {
        return forcastBoxOffice;
    }

    public void setForcastBoxOffice(int forcastBoxOffice) {
        this.forcastBoxOffice = forcastBoxOffice;
    }

    public String getPartInTickNum() {
        return partInTickNum;
    }

    public void setPartInTickNum(String partInTickNum) {
        this.partInTickNum = partInTickNum;
    }

    public String getFightSponsor() {
        return fightSponsor;
    }

    public void setFightSponsor(String fightSponsor) {
        this.fightSponsor = fightSponsor;
    }

    public int getEvaCommitNum() {
        return evaCommitNum;
    }

    public void setEvaCommitNum(int evaCommitNum) {
        this.evaCommitNum = evaCommitNum;
    }
}
