//package com.tang.activity;
//
//import android.os.Bundle;
//import android.support.design.widget.TabLayout;
//import android.support.v4.app.Fragment;
//import android.support.v4.view.ViewPager;
//
//import com.tang.AssetFragment;
//import com.tang.MainFragmentAdapter;
//import com.tang.PledgeFragment;
//import com.tang.R;
//
//import java.util.ArrayList;
//
//public class PubCommentsActivity extends ActivityRoot{
//
//
//    private ViewPager mMainViewPager;
//    public  static ArrayList<Fragment> mFragments;
//    private TabLayout mTabLayout;
//
//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//
//        initDatas();
//        initViews();
//        initListeners();
//    }
//
//
//    private void initViews() {
//        setContentView(R.layout.chain_pubcomments_activity);
//
//        mMainViewPager=(ViewPager)findViewById(R.id.vp_main_page);
//        mTabLayout=(TabLayout)findViewById(R.id.tab_layout);
//
//
//        //下面这个可能是实现滑动功能，需要实现一下。目前滑动没有实现，后面再加上。
//        mMainViewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
//            @Override
//            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
//
//            }
//            @Override
//            public void onPageSelected(int position) {
////                showToast(String.valueOf(position));
//            }
//            @Override
//            public void onPageScrollStateChanged(int state) {
//
//            }
//
//        });
//
//        mFragments = new ArrayList<>();  //Fragment的List
//
//        assetFragment=new AssetFragment();
//        pledgeFragmrnt=new PledgeFragment();
//        mFragments.add(assetFragment);
//        mFragments.add(pledgeFragmrnt);
////      FragmentManager mfragmentManager=this.getChildFragmentManager() ; //
//
//        //这里的getSupportFragmentManager与尚行客中的不一样，注意一下
//        MainFragmentAdapter mainFragmentAdapter =           //ViewPager的适配器
//                new MainFragmentAdapter(getSupportFragmentManager()/*getFragmentManager()*/, mFragments);  //这里把getSupportFragmentManager()改了，注意一下
//        mMainViewPager.setAdapter(mainFragmentAdapter);        //设置ViewPager的适配器  //这里崩溃了，可能是上面那行引起的
//        mTabLayout.setupWithViewPager(mMainViewPager);
//
//        mMainViewPager.setCurrentItem(0);
//
//    }
//
//
//    public void initDatas(){
//
//
//    }
//
//
//    public void initListeners(){
//
//
//    }
//
//}
