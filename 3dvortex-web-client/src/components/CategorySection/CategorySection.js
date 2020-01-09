import React from 'react';
import HorizontalSection from '../HorizontalSection/HorizontalSection';
import CategorySectionItem from './CategorySectionItem/CategorySectionItem';


const CategorySection = (props) => {
    return (
      <HorizontalSection text={props.text}>
        <CategorySectionItem name='Tecnologia'/>
        <CategorySectionItem name='Hogar'/>
        <CategorySectionItem name='Diseño'/>
        <CategorySectionItem name='Plantas'/>
        <CategorySectionItem name='Adornos'/>
        <CategorySectionItem name='Mecánica'/>
      </HorizontalSection>
    );
}

export default CategorySection;
