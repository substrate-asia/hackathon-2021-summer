package com.tang.data_entity;

import android.graphics.Bitmap;

import java.io.Serializable;
import java.math.BigInteger;

public class NFTEvaluatedFilmCardEntity implements Serializable{
    String FilmId;
    String FilmName; //电影名称
    Bitmap FilmPic;//电影图片；
    String PartInNum; //参与人数
    //    String HotNum;  //热度
//    String TotalBonus; //奖金
    String Score;  //影评分
    String HeiMaScore; //黑马等级
    String Owner;   //卡牌拥有者
    String Price;

    public String getFilmId() {
        return FilmId;
    }

    public void setFilmId(String filmId) {
        FilmId = filmId;
    }

    public String getFilmName() {
        return FilmName;
    }

    public void setFilmName(String filmName) {
        FilmName = filmName;
    }

    public Bitmap getFilmPic() {
        return FilmPic;
    }

    public void setFilmPic(Bitmap filmPic) {
        FilmPic = filmPic;
    }

    public String getPartInNum() {
        return PartInNum;
    }

    public void setPartInNum(String partInNum) {
        PartInNum = partInNum;
    }

    public String getScore() {
        return Score;
    }

    public void setScore(String score) {
        Score = score;
    }

    public String getHeiMaScore() {
        return HeiMaScore;
    }

    public void setHeiMaScore(String heiMaScore) {
        HeiMaScore = heiMaScore;
    }

    public String getOwner() {
        return Owner;
    }

    public void setOwner(String owner) {
        Owner = owner;
    }

    public String getPrice() {
        return Price;
    }

    public void setPrice(String price) {
        Price = price;
    }
}
