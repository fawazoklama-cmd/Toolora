import React from 'react';

// Math
import { BasicCalculator } from './math/BasicCalculator';
import { PercentageCalculator } from './math/PercentageCalculator';
import { DiscountCalculator } from './math/DiscountCalculator';
import { AverageCalculator } from './math/AverageCalculator';
import { AreaPerimeterCalculator } from './math/AreaPerimeterCalculator';
import { BillSplitter } from './math/BillSplitter';
import { RatioCalculator } from './math/RatioCalculator';
import { FractionCalculator } from './math/FractionCalculator';
import { ProfitMarginCalculator } from './math/ProfitMarginCalculator';
import { UnitPriceCalculator } from './math/UnitPriceCalculator';

// Text
import { WordCounter } from './text/WordCounter';
import { CaseConverter } from './text/CaseConverter';
import { WhitespaceCleaner } from './text/WhitespaceCleaner';
import { DuplicateLineRemover } from './text/DuplicateLineRemover';
import { AlphabeticalSorter } from './text/AlphabeticalSorter';
import { TextReverser } from './text/TextReverser';
import { FindAndReplace } from './text/FindAndReplace';
import { LoremIpsumGenerator } from './text/LoremIpsumGenerator';
import { SlugGenerator } from './text/SlugGenerator';
import { LineCounter } from './text/LineCounter';

// Developer
import { JsonFormatter } from './developer/JsonFormatter';
import { Base64Tool } from './developer/Base64Tool';
import { UrlEncoderTool } from './developer/UrlEncoderTool';
import { HtmlEntityTool } from './developer/HtmlEntityTool';
import { UuidGenerator } from './developer/UuidGenerator';
import { TimestampConverter } from './developer/TimestampConverter';
import { ColorCodeConverter } from './developer/ColorCodeConverter';
import { RegexTester } from './developer/RegexTester';
import { HtmlPreview } from './developer/HtmlPreview';
import { JwtDecoder } from './developer/JwtDecoder';

// Security
import { PasswordGenerator } from './security/PasswordGenerator';
import { PasswordStrength } from './security/PasswordStrength';
import { PinGenerator } from './security/PinGenerator';
import { TokenGenerator } from './security/TokenGenerator';
import { HashGenerator } from './security/HashGenerator';

// Design
import { ColorPickerTool } from './design/ColorPickerTool';
import { GradientGenerator } from './design/GradientGenerator';
import { ContrastChecker } from './design/ContrastChecker';
import { BoxShadowGenerator } from './design/BoxShadowGenerator';
import { BorderRadiusGenerator } from './design/BorderRadiusGenerator';
import { GlassmorphismGenerator } from './design/GlassmorphismGenerator';

// Converter
import { UnitConverter } from './converter/UnitConverter';
import { NumberBaseConverter } from './converter/NumberBaseConverter';

// Image
import { ImageResizer } from './image/ImageResizer';
import { ImageCompressor } from './image/ImageCompressor';
import { ImageFormatConverter } from './image/ImageFormatConverter';
import { ImageMetadataViewer } from './image/ImageMetadataViewer';

// Social
import { QrCodeGenerator } from './social/QrCodeGenerator';
import { SocialBioGenerator } from './social/SocialBioGenerator';
import { UsernameGenerator } from './social/UsernameGenerator';
import { CaptionGenerator } from './social/CaptionGenerator';
import { FancyTextGenerator } from './social/FancyTextGenerator';

// File
import { CsvViewer } from './file/CsvViewer';
import { JsonViewer } from './file/JsonViewer';
import { TextToFile } from './file/TextToFile';
import { FileSizeCalculator } from './file/FileSizeCalculator';

// Date & Time
import { AgeCalculator } from './datetime/AgeCalculator';
import { DateDifference } from './datetime/DateDifference';
import { CountdownTimer } from './datetime/CountdownTimer';
import { Stopwatch } from './datetime/Stopwatch';
import { DigitalClock } from './datetime/DigitalClock';
import { DateAddSubtract } from './datetime/DateAddSubtract';

// Finance
import { SavingsGoalCalculator } from './finance/SavingsGoalCalculator';
import { BudgetCalculator } from './finance/BudgetCalculator';
import { PercentageChangeCalculator } from './finance/PercentageChangeCalculator';

// Generators
import { RandomPicker } from './generators/RandomPicker';
import { TeamGenerator } from './generators/TeamGenerator';
import { RandomNumberGenerator } from './generators/RandomNumberGenerator';
import { WifiQrGenerator } from './generators/WifiQrGenerator';

export const TOOL_COMPONENTS: Record<string, React.FC> = {
  // Math
  'calculator': BasicCalculator,
  'percentage-calculator': PercentageCalculator,
  'discount-calculator': DiscountCalculator,
  'average-calculator': AverageCalculator,
  'area-calculator': AreaPerimeterCalculator,
  'bill-splitter': BillSplitter,
  'ratio-calculator': RatioCalculator,
  'fraction-calculator': FractionCalculator,
  'profit-margin-calculator': ProfitMarginCalculator,
  'unit-price-calculator': UnitPriceCalculator,

  // Text
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'whitespace-cleaner': WhitespaceCleaner,
  'duplicate-line-remover': DuplicateLineRemover,
  'alphabetical-sorter': AlphabeticalSorter,
  'text-reverser': TextReverser,
  'find-and-replace': FindAndReplace,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'slug-generator': SlugGenerator,
  'line-counter': LineCounter,

  // Developer
  'json-formatter': JsonFormatter,
  'base64-tool': Base64Tool,
  'url-encoder': UrlEncoderTool,
  'html-entity-tool': HtmlEntityTool,
  'uuid-generator': UuidGenerator,
  'timestamp-converter': TimestampConverter,
  'color-code-converter': ColorCodeConverter,
  'regex-tester': RegexTester,
  'html-preview': HtmlPreview,
  'jwt-decoder': JwtDecoder,

  // Security
  'password-generator': PasswordGenerator,
  'password-strength': PasswordStrength,
  'pin-generator': PinGenerator,
  'token-generator': TokenGenerator,
  'hash-generator': HashGenerator,

  // Design
  'color-picker': ColorPickerTool,
  'gradient-generator': GradientGenerator,
  'contrast-checker': ContrastChecker,
  'box-shadow-generator': BoxShadowGenerator,
  'border-radius-generator': BorderRadiusGenerator,
  'glassmorphism-generator': GlassmorphismGenerator,

  // Converter
  'unit-converter': UnitConverter,
  'number-base-converter': NumberBaseConverter,

  // Image
  'image-resizer': ImageResizer,
  'image-compressor': ImageCompressor,
  'image-format-converter': ImageFormatConverter,
  'image-metadata-viewer': ImageMetadataViewer,

  // Social
  'qr-code-generator': QrCodeGenerator,
  'bio-generator': SocialBioGenerator,
  'username-generator': UsernameGenerator,
  'caption-generator': CaptionGenerator,
  'fancy-text-generator': FancyTextGenerator,

  // File
  'csv-viewer': CsvViewer,
  'json-viewer': JsonViewer,
  'text-to-file': TextToFile,
  'file-size-calculator': FileSizeCalculator,

  // Date & Time
  'age-calculator': AgeCalculator,
  'date-difference': DateDifference,
  'countdown-timer': CountdownTimer,
  'stopwatch': Stopwatch,
  'digital-clock': DigitalClock,
  'date-add-subtract': DateAddSubtract,

  // Finance
  'savings-goal-calculator': SavingsGoalCalculator,
  'budget-calculator': BudgetCalculator,
  'percentage-change': PercentageChangeCalculator,

  // Generators
  'random-picker': RandomPicker,
  'team-generator': TeamGenerator,
  'random-number-generator': RandomNumberGenerator,
  'wifi-qr-generator': WifiQrGenerator,
};
